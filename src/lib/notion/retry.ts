const DEFAULT_MAX_ATTEMPTS = 3

// Notion API Rate Limit(429) 대응 — exponential backoff 재시도 래퍼
// Retry-After 헤더가 있으면 해당 값 우선, 없으면 2^attempt 초 대기
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = DEFAULT_MAX_ATTEMPTS
): Promise<T> {
  let lastError: unknown

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      const isRateLimit =
        error instanceof Error && error.message.includes('rate_limited')

      if (!isRateLimit || attempt === maxAttempts - 1) throw error

      const delaySeconds = Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000))
    }
  }

  throw lastError
}
