import type { Message } from '@/types/ai';
export interface ChatBubbleProps {
  message: Message;
  isStreaming?: boolean;
}
