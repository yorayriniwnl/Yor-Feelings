export function analyzeSentiment(text: string) {
  const lowered = text.toLowerCase()
  const positive = ["good", "great", "love", "happy", "proud", "calm", "hope", "support"]
  const negative = ["sad", "angry", "anxious", "worried", "hate", "bad", "hurt", "lonely"]

  const score = positive.reduce((acc, word) => acc + (lowered.includes(word) ? 1 : 0), 0) -
    negative.reduce((acc, word) => acc + (lowered.includes(word) ? 1 : 0), 0)

  const normalized = Math.max(-1, Math.min(1, score / 4))
  const mood =
    normalized > 0.3 ? "positive" :
    normalized < -0.3 ? "negative" :
    "neutral"

  return { mood, score: normalized }
}
