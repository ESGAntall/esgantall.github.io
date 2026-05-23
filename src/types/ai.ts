export type ChatRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: Date;
}

export interface ChatRequest {
  messages: Pick<Message, 'role' | 'content'>[];
}

export interface StreamChunk {
  type: 'delta' | 'done' | 'error';
  text?: string;
  error?: string;
}
