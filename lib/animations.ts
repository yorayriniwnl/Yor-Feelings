export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 }
}

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
}
