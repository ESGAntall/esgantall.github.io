import Anthropic from '@anthropic-ai/sdk';

// Singleton Anthropic client — chỉ dùng ở Server side
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
