export function aggregateMood(values: Array<{ score: number }>) {
  const count = values.length || 1
  const avg = values.reduce((sum, value) => sum + value.score, 0) / count
  return {
    average: Number(avg.toFixed(2)),
    label: avg > 0.35 ? "uplifted" : avg < -0.35 ? "heavy" : "balanced"
  }
}
