import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages: await convertToModelMessages(messages),
    system: 'You are a helpful internal assistant. Be concise and accurate.',
  });

  return result.toUIMessageStreamResponse();
}
