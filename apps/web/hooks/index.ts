import { useState, useEffect } from 'react'

export function useScrollToTop(id: string, trigger: any) {
  useEffect(() => {
    const { offsetTop } = document.getElementById(id)
    window.scrollTo({ top: offsetTop - 24, behavior: 'smooth' })
  }, [id, trigger])
}

export function useCursor(total = 0) {
  const [index, setIndex] = useState<number>(0)

  const isHead = index === 0
  const isTail = index === total - 1

  const goToHead = () => setIndex(0)
  const moveOneStepTowardHead = () => setIndex(index - 1)

  const goToTail = () => setIndex(total - 1)
  const moveOneStepTowardTail = () => setIndex(index + 1)

  const goNext = isHead ? goToTail : moveOneStepTowardHead
  const goPrevious = isTail ? goToHead : moveOneStepTowardTail

  return {
    index,
    isHead,
    isTail,
    goToHead,
    goToTail,
    goNext,
    goPrevious,
    currentLabel: `${total - index} / ${total}`,
  }
}
