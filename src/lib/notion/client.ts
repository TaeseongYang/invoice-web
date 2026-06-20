import { Client } from '@notionhq/client'

import { env } from '@/lib/env'

export function createNotionClient(): Client {
  return new Client({ auth: env.NOTION_API_TOKEN ?? '' })
}
