import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Notion API (서버 전용 — 절대 NEXT_PUBLIC_ 접두사 금지)
  NOTION_API_TOKEN: z.string().optional(),
  NOTION_DATABASE_ID: z.string().optional(),

  // Email (서버 전용)
  RESEND_API_KEY: z.string().optional(),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NOTION_API_TOKEN: process.env.NOTION_API_TOKEN,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
})

export type Env = z.infer<typeof envSchema>
