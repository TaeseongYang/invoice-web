const PAGE_ID_REGEX = /([0-9a-f]{32})/i

export function extractPageId(url: string): string {
  const match = url.match(PAGE_ID_REGEX)
  if (!match) throw new Error('유효한 노션 페이지 URL이 아닙니다.')
  const hex = match[1]
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export function isValidNotionUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    const isNotionDomain =
      parsed.hostname.includes('notion.so') ||
      parsed.hostname.includes('notion.com')
    return isNotionDomain && PAGE_ID_REGEX.test(url)
  } catch {
    return false
  }
}
