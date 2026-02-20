export interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
}

export const MODELS: Model[] = [
  { id: "google/gemini-3-flash-preview", name: "Gemini 3 Flash", provider: "Google", description: "Fast & capable next-gen model" },
  { id: "google/gemini-3-pro-preview", name: "Gemini 3 Pro", provider: "Google", description: "Next-generation top-tier reasoning" },
  { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google", description: "Best for complex reasoning & vision" },
  { id: "google/gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google", description: "Balanced speed & quality" },
  { id: "google/gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", provider: "Google", description: "Fastest & cheapest" },
  { id: "openai/gpt-5", name: "GPT-5", provider: "OpenAI", description: "Powerful all-rounder" },
  { id: "openai/gpt-5-mini", name: "GPT-5 Mini", provider: "OpenAI", description: "Strong performance, lower cost" },
  { id: "openai/gpt-5-nano", name: "GPT-5 Nano", provider: "OpenAI", description: "Speed & cost optimized" },
  { id: "openai/gpt-5.2", name: "GPT-5.2", provider: "OpenAI", description: "Enhanced reasoning" },
];

export const DEFAULT_MODEL = MODELS[0];
