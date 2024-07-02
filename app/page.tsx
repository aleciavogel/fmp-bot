import React from 'react'

import { Chat } from '@/components/chat' // Ensure this uses the shadcn version

const Home = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex w-full h-screen">
        <div className="flex flex-col w-full h-full items-center bg-white">
          <div className="max-w-2xl w-full h-full">
            <Chat />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
