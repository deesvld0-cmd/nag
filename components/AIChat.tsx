'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, MessageSquare, Send, User, X } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm your fitness & nutrition assistant. Ask me about training, diet, recovery, or supplements.",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    const requestMessages = [...messages, userMessage]

    // Pre-add assistant message so we can stream tokens into it.
    setMessages([...requestMessages, { role: 'assistant', content: '' }])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: requestMessages }),
      })

      if (!response.ok) {
        throw new Error(`AI request failed: ${response.status}`)
      }

      if (!response.body) {
        throw new Error('AI response stream is empty')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        assistantText += decoder.decode(value, { stream: true })

        // Update the last message (the assistant placeholder) as tokens arrive.
        setMessages((prev) => {
          if (prev.length === 0) return prev
          const next = [...prev]
          const lastIdx = next.length - 1
          const last = next[lastIdx]
          if (!last || last.role !== 'assistant') return next
          next[lastIdx] = { ...last, content: assistantText }
          return next
        })
      }
    } catch (error) {
      console.error('AI chat error:', error)
      setMessages((prev) => {
        const next = [...prev]
        const lastIdx = next.length - 1
        if (next[lastIdx]?.role === 'assistant') {
          next[lastIdx] = {
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again.',
          }
          return next
        }
        return [...next, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#D4FF00] rounded-full flex items-center justify-center shadow-lg shadow-[#D4FF00]/30 hover:scale-110 transition-transform cursor-pointer"
          aria-label="Open AI chat"
          type="button"
        >
          <MessageSquare className="w-8 h-8 text-black" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-[400px] max-w-[calc(100vw-2rem)] bg-gradient-to-b from-[#111111] to-[#0A0A0A] rounded-2xl shadow-2xl border border-[#D4FF00]/20 flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="p-4 border-b border-[#D4FF00]/10 bg-gradient-to-r from-[#D4FF00]/5 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4FF00]/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#D4FF00]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Assistant</h3>
                <p className="text-white/50 text-xs">Fitness & Nutrition</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Close AI chat"
              type="button"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#D4FF00]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user' ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-white/90'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#D4FF00] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#D4FF00]/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-[#D4FF00]" />
                </div>
                <div className="bg-white/5 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#D4FF00] rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-[#D4FF00] rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className="w-2 h-2 bg-[#D4FF00] rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#D4FF00]/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#D4FF00]/40"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center hover:bg-[#C1EA00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                aria-label="Send message"
              >
                <Send className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

