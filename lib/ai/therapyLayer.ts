export function therapyLayer(input: { sentiment: string; toxicity: number; content: string }) {
  if (input.toxicity > 0.8) {
    return {
      tone: "gentle",
      suggestion: "This message needs a careful review before it is shared."
    }
  }

  if (input.sentiment === "negative") {
    return {
      tone: "supportive",
      suggestion: "Try naming the feeling in one sentence, then add one concrete next step."
    }
  }

  return {
    tone: "steady",
    suggestion: "Keep it short, honest, and specific. The room reads better that way."
  }
}
