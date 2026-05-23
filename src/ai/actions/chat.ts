'use server';

import { anthropic } from '@/ai/client';
import { SYSTEM_PROMPT } from '@/ai/prompts/system';
import type { ChatRequest } from '@/types/ai';

/**
 * Server Action: stream chat response từ Claude
 * Dùng trong Route Handler tại /api/chat
 */
export async function createChatStream(request: ChatRequest) {
  const stream = anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: request.messages,
  });

  return stream;
}
