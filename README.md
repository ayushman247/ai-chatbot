# Internal Assistant — AI Chatbot Demo

A minimal AI chatbot built with **Next.js**, the **Vercel AI SDK**, and **Groq** (free-tier hosted open models). Built to demonstrate how quickly a working, streaming chatbot can be stood up for internal enterprise use cases.

**Live demo:** [https://ai-chatbot-sand-ten-20.vercel.app/](https://ai-chatbot-sand-ten-20.vercel.app/)

## Tech stack

- **Next.js (App Router)** — frontend UI + backend API route in one project
- **Vercel AI SDK** (`ai`, `@ai-sdk/react`) — chat state, streaming, and message handling
- **Groq** (`@ai-sdk/groq`) — LLM provider, running `llama-3.3-70b-versatile`
- **react-markdown** — renders model responses (bold, lists, code blocks, etc.) as formatted text instead of raw markdown
- **Tailwind CSS** — styling

## Prerequisites

- [Node.js](https://nodejs.org) installed (includes `npm` and `npx`)
- A free [Groq API key](https://console.groq.com) — no credit card required

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with your Groq API key:
   ```
   GROQ_API_KEY=your-key-here
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Project structure

```
app/
  page.tsx           # Chat UI (React component, client-side)
  api/
    chat/
      route.ts       # Backend endpoint — calls Groq via the AI SDK, streams the response
  globals.css        # Tailwind setup
```

- `app/page.tsx` renders the chat interface and calls `/api/chat` via the `useChat` hook.
- `app/api/chat/route.ts` receives the conversation, sends it to the model, and streams the reply back. This is the only place the API key is used — it never reaches the browser.

## Swapping the model provider

Changing the underlying LLM is a small, isolated change in `app/api/chat/route.ts` — swap the provider import and the `model:` call. The rest of the app (UI, `useChat`, streaming) stays the same.

| Provider | Package | Example model call |
|---|---|---|
| Groq (current) | `@ai-sdk/groq` | `groq('llama-3.3-70b-versatile')` |
| Anthropic (Claude) | `@ai-sdk/anthropic` | `anthropic('claude-sonnet-5')` |
| OpenAI | `@ai-sdk/openai` | `openai('gpt-4o-mini')` |

