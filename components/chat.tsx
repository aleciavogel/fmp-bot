'use client'

import type { FC, FormEvent } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import type { Message } from 'ai'
import { useChat } from 'ai/react'

import { ChatMessageBubble } from '@/components/chat-message-bubble'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

interface ChatProps {
  onSymbolChange: (symbol: string) => void
}

export const Chat: FC<ChatProps> = ({ onSymbolChange }) => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null)
  const endpoint = '/api/chat'
  const [intermediateStepsLoading, setIntermediateStepsLoading] = useState(false)
  const [sourcesForMessages, setSourcesForMessages] = useState<Record<string, any>>({})
  const { toast } = useToast()

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
    addToolResult,
  } = useChat({
    api: endpoint,
    onResponse(response) {
      const sourcesHeader = response.headers.get('x-sources')
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, 'base64').toString('utf8'))
        : []
      const messageIndexHeader = response.headers.get('x-message-index')

      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({ ...sourcesForMessages, [messageIndexHeader]: sources })
      }
    },
    streamMode: 'text',
    onError: (e) => {
      toast({
        title: 'An error occurred',
        description: e.message,
      })
    },
    onFinish: (messages) => {
      console.log(messages)
    },
    onToolCall: (toolCall) => {
      console.log('Tool call:', toolCall)
    },
  })

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add('grow')
    }
    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
    if (chatEndpointIsLoading || intermediateStepsLoading) {
      return
    }

    setIntermediateStepsLoading(true)
    setInput('')
    const messagesWithUserReply = messages.concat({
      id: messages.length.toString(),
      content: input,
      role: 'user',
    })
    setMessages(messagesWithUserReply)
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        messages: messagesWithUserReply,
        show_intermediate_steps: true,
      }),
    })
    const json = await response.json()
    setIntermediateStepsLoading(false)
    if (response.status === 200) {
      const responseMessages: Message[] = json.messages
      // Represent intermediate steps as system messages for display purposes
      // TODO: Add proper support for tool messages
      const toolCallMessages = responseMessages.filter((responseMessage: Message) => {
        return (
          (responseMessage.role === 'assistant' && !!responseMessage.tool_calls?.length) ||
          responseMessage.role === 'tool'
        )
      })

      const intermediateStepMessages = []
      for (let i = 0; i < toolCallMessages.length; i += 2) {
        const aiMessage = toolCallMessages[i]
        const toolMessage = toolCallMessages[i + 1]
        intermediateStepMessages.push({
          id: (messagesWithUserReply.length + i / 2).toString(),
          role: 'system' as const,
          content: JSON.stringify({
            action: aiMessage.tool_calls?.[0],
            observation: toolMessage.content,
          }),
        })
      }
      const newMessages = messagesWithUserReply
      for (const message of intermediateStepMessages) {
        newMessages.push(message)
        setMessages([...newMessages])
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))
      }
      setMessages([
        ...newMessages,
        {
          id: newMessages.length.toString(),
          content: responseMessages[responseMessages.length - 1].content,
          role: 'assistant',
        },
      ])
    } else {
      if (json.error) {
        toast({
          title: 'An Error Occurred',
          description: json.error,
        })
        throw new Error(json.error)
      }
    }
  }

  // automatically scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // When messages changes, check the last message appended for the role of 'system'
    // If it is a system message, check if there is a symbol param in the args
    const lastMessage = messages[messages.length - 1]

    if (lastMessage?.role === 'system') {
      const lastMessageContent = JSON.parse(lastMessage.content)
      const { action } = lastMessageContent
      console.log('action', action)
      // Check if observation can be parsed as JSON
      const { args } = action

      if (args.symbol) {
        onSymbolChange(args.symbol)
      }
    }

    if (lastMessage?.role === 'tool') {
      console.log('tool message', lastMessage.content)
    }

    scrollToBottom()
  }, [messages, onSymbolChange])

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-md shadow-md">
      <div className="flex-grow overflow-y-auto space-y-4" ref={messageContainerRef}>
        {messages.length > 0
          ? [...messages].map((m, i) => {
              const sourceKey = (messages.length - 1 - i).toString()
              return m.role === 'system' ? null : (
                <ChatMessageBubble
                  key={m.id}
                  message={m}
                  aiEmoji={'🤖'}
                  sources={sourcesForMessages[sourceKey]}
                ></ChatMessageBubble>
              )
            })
          : ''}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex">
        <Input
          type="text"
          className="flex-grow mr-2"
          value={input}
          onChange={handleInputChange}
          placeholder={'Enter your question'}
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white"
          disabled={chatEndpointIsLoading || intermediateStepsLoading}
        >
          <div
            role="status"
            className={`${chatEndpointIsLoading || intermediateStepsLoading ? '' : 'hidden'} flex justify-center`}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-white animate-spin dark:text-white fill-sky-800"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <span className={chatEndpointIsLoading || intermediateStepsLoading ? 'hidden' : ''}>
            Send
          </span>
        </Button>
      </form>
    </div>
  )
}

export default Chat
