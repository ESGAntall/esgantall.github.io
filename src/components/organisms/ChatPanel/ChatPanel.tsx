'use client';

import { useState, useRef, useEffect } from 'react';
import ChatBubble from '@/components/molecules/ChatBubble';
import InputBar from '@/components/molecules/InputBar';
import { generateId } from '@/lib/utils';
import type { Message } from '@/types/ai';
import styles from './ChatPanel.module.scss';
import type { ChatPanelProps } from './ChatPanel.types';

export default function ChatPanel({ className }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMsg: Message = { id: generateId(), role: 'user', content, createdAt: new Date() };
    const aiMsg: Message   = { id: generateId(), role: 'assistant', content: '', createdAt: new Date() };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setIsStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = JSON.parse(line.slice(6));
          if (data.type === 'delta') {
            setMessages(prev =>
              prev.map(m => m.id === aiMsg.id ? { ...m, content: m.content + data.text } : m)
            );
          }
        }
      }
    } catch (err) {
      console.error('[Chat error]', err);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className={`${styles.panel} ${className ?? ''}`}>
      {messages.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.icon}>⬡</span>
          <p>Hỏi ESGAntall bất cứ điều gì...</p>
        </div>
      ) : (
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              isStreaming={isStreaming && i === messages.length - 1}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      )}
      <InputBar onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}
