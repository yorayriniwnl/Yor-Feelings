export function TypingIndicator({ name = "Someone" }: { name?: string }) {
  return <p className="text-sm text-white/55">{name} is typing<span className="animate-pulse">...</span></p>
}
