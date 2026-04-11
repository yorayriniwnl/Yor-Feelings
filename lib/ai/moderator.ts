const unsafePatterns = [
  /self\s*harm/i,
  /kill\s*myself/i,
  /bomb/i,
  /hate\s*speech/i,
  /doxx/i
]

export function moderateText(content: string) {
  const flagged = unsafePatterns.some((pattern) => pattern.test(content))
  const toxicity = flagged ? 0.92 : Math.min(0.92, Math.max(0.05, content.length / 1500))
  const decision = flagged ? "blocked" : content.length < 4 ? "needs_review" : "approved"
  return {
    decision,
    toxicity,
    reasons: flagged ? ["potential safety risk detected"] : []
  }
}
