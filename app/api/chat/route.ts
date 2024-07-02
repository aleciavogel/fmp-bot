import {
  AIMessage,
  BaseMessage,
  ChatMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { ChatOpenAI } from '@langchain/openai'
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

import tools from '@/vendors/fmp/tools'

export const runtime = 'edge'

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === 'user') {
    return new HumanMessage(message.content)
  } else if (message.role === 'assistant') {
    return new AIMessage(message.content)
  } else {
    return new ChatMessage(message.content, message.role)
  }
}

const convertLangChainMessageToVercelMessage = (message: BaseMessage) => {
  if (message._getType() === 'human') {
    return { content: message.content, role: 'user' }
  } else if (message._getType() === 'ai') {
    return {
      content: message.content,
      role: 'assistant',
      tool_calls: (message as AIMessage).tool_calls,
    }
  } else {
    return {
      content: message.content,
      role: message._getType(),
      metadata: message.response_metadata,
    }
  }
}

const AGENT_SYSTEM_TEMPLATE = `
  You are a helpful assistant. You are here to help me with my questions about the stock exchange, finances, and 
  investment opportunities using the provided tools. If a tool does not exist for querying a type of information, 
  reply that you do not know. Do not make any assumptions and refer the user to seek professional advice when
  appropriate.

  Summarize information in a concise narrative format suitable for beginners rather than a list wherever possible. 
  Combine related details into cohesive sentences and limit the response to one or two paragraphs.
  
  If the user asks for advice, query the most recent data available and provide a recommendation based on the data.
`.trim()

/**
 * This handler initializes and calls a tool which calls ReAct agent.
 * See the docs for more information:
 *
 * https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const returnIntermediateSteps = body.show_intermediate_steps

    /**
     * We represent intermediate steps as system messages for display purposes,
     * but don't want them in the chat history.
     */
    const messages = (body.messages ?? [])
      .filter(
        (message: VercelChatMessage) => message.role === 'user' || message.role === 'assistant',
      )
      .map(convertVercelMessageToLangChainMessage)

    const chat = new ChatOpenAI({
      model: 'gpt-4o',
      temperature: 0,
    })

    /**
     * Use a prebuilt LangGraph agent.
     */
    const agent = createReactAgent({
      llm: chat,
      tools,
      messageModifier: new SystemMessage(AGENT_SYSTEM_TEMPLATE),
    })

    if (!returnIntermediateSteps) {
      /**
       * Stream back all generated tokens and steps from their runs.
       *
       * We do some filtering of the generated events and only stream back
       * the final response as a string.
       *
       * For this specific type of tool calling ReAct agents with OpenAI, we can tell when
       * the agent is ready to stream back final output when it no longer calls
       * a tool and instead streams back content.
       *
       * See: https://langchain-ai.github.io/langgraphjs/how-tos/stream-tokens/
       */
      const eventStream = agent.streamEvents({ messages }, { version: 'v2' })

      const textEncoder = new TextEncoder()
      const transformStream = new ReadableStream({
        async start(controller) {
          for await (const { event, data } of eventStream) {
            if (event === 'on_tool_start') {
              if (typeof data.input.input === 'string') {
                const parsed = JSON.parse(data.input.input)

                if (parsed.symbol) {
                  const toolCallEvent = JSON.stringify({
                    symbol: JSON.parse(data.input.input).symbol,
                  })
                  controller.enqueue(textEncoder.encode(`${toolCallEvent}\n\n`))
                }
              }
            }

            if (event === 'on_chat_model_stream') {
              // Intermediate chat model generations will contain tool calls and no content
              if (!!data.chunk.content) {
                controller.enqueue(textEncoder.encode(data.chunk.content))
              }
            }
          }
          controller.close()
        },
      })

      return new StreamingTextResponse(transformStream)
    } else {
      /**
       * We could also pick intermediate steps out from `streamEvents` chunks, but
       * they are generated as JSON objects, so streaming and displaying them with
       * the AI SDK is more complicated.
       */
      const result = await agent.invoke({ messages })
      return NextResponse.json(
        {
          messages: result.messages.map(convertLangChainMessageToVercelMessage),
        },
        { status: 200 },
      )
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
