import { NextRequest, NextResponse } from 'next/server';
import { anthropic } from '@/ai/client';
import { SYSTEM_PROMPT } from '@/ai/prompts/system';
import type { ChatRequest } from '@/types/ai';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      stream: true,
      system: SYSTEM_PROMPT,
      messages: body.messages,
    });

    // Trả về ReadableStream để FE dùng
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of response) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            const data = JSON.stringify({ type: 'delta', text: chunk.delta.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
          if (chunk.type === 'message_stop') {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
            controller.close();
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[AI Route Error]', error);
    return NextResponse.json({ error: 'AI service error' }, { status: 500 });
  }
}
