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

const embeddedEventRegex = /{"symbol":.*?}\n/

const filterOutEvents = (messages: Message[]) => {
  return messages.map((m) => {
    // Use a regular expression to find and remove the tool_call JSON object
    const cleanedContent = m.content.replace(embeddedEventRegex, '')
    return { ...m, content: cleanedContent.trim() }
  })
}

const getEvent = (message: Message) => {
  if (!message?.content) {
    return null
  }

  const match = message.content.match(embeddedEventRegex)
  if (match) {
    return JSON.parse(match[0])
  }
  return null
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

    handleSubmit(e)
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

    if (getEvent(lastMessage) !== null) {
      const event = getEvent(lastMessage)
      if (event?.symbol) {
        onSymbolChange(event.symbol)
      }

      // let args
      //
      // try {
      //   // Check if input is a JSON string or already an object
      //   args = typeof input === 'string' ? JSON.parse(input) : input
      //   args = typeof args.input === 'string' ? JSON.parse(args.input) : args.input
      //   if (args?.symbol !== undefined) {
      //     console.log('Symbol:', args?.symbol)
      //     onSymbolChange(args?.symbol)
      //   }
      // } catch (error) {
      //   console.error('Invalid JSON format:', input)
      //   args = null
      // }
      //
      // if (args?.symbol) {
      //   onSymbolChange(args?.symbol)
      // }
    }

    scrollToBottom()
  }, [messages, onSymbolChange])

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-md shadow-md">
      <div className="flex-grow overflow-y-auto space-y-4" ref={messageContainerRef}>
        {messages.length > 0
          ? [...filterOutEvents(messages)].map((m, i) => {
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
