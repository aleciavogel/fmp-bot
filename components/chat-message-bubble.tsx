import Markdown from 'react-markdown'
import type { Message } from 'ai/react'

export function ChatMessageBubble(props: { message: Message; aiEmoji?: string; sources: any[] }) {
  const colorClassName = props.message.role === 'user' ? 'bg-sky-600' : 'bg-slate-50 text-black'
  const alignmentClassName = props.message.role === 'user' ? 'ml-auto' : 'mr-auto'
  const prefix = props.message.role === 'user' ? '🧑' : props.aiEmoji

  return (
    <div
      className={`${alignmentClassName} ${colorClassName} rounded px-4 py-2 max-w-[80%] mb-8 flex`}
    >
      <div className="mr-2">{prefix}</div>
      <div className="space-y-4">
        <Markdown
          components={{
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-outside mb-2 pl-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-outside mb-2 pl-4" {...props} />
            ),
            li: ({ node, ...props }) => <li className="" {...props} />,
            p: ({ node, ...props }) => <p className="block" {...props} />,
            img: ({ node, ...props }) => (
              <div className="mt-5">
                <img className="max-w-full" {...props} />
              </div>
            ),
            a: ({ node, children, ...props }) => (
              <a
                className="text-blue-600 underline"
                target="_blank"
                rel="noreferrer noopener"
                {...props}
              >
                {children}
              </a>
            ),
          }}
        >
          {props.message.content}
        </Markdown>
      </div>
    </div>
  )
}
