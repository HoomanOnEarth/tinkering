import { MouseEventHandler } from 'react'
import styles from './Navigator.module.css'

type NavigatorProps = {
  total: number
  current: number
  goPrev: MouseEventHandler<HTMLButtonElement>
  goNext: MouseEventHandler<HTMLButtonElement>
  oldestLabel: string
  prevLabel: string
  nextLabel: string
  latestLabel: string
}

function Navigator({
  total,
  current,
  goPrev,
  goNext,
  prevLabel,
  nextLabel,
  latestLabel,
  oldestLabel,
}: NavigatorProps) {
  const hasNext = current < total - 1
  const hasPrev = current > 0

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} disabled={!hasPrev} onClick={goPrev}>
        {hasPrev ? prevLabel : latestLabel}
      </button>
      <div className={styles.hint}>
        {current + 1} / {total}
      </div>
      <button className={styles.button} disabled={!hasNext} onClick={goNext}>
        {hasNext ? nextLabel : oldestLabel}
      </button>
    </div>
  )
}

Navigator.defaultProps = {
  goPrevLabel: 'Previous',
  goNextLabel: 'Next',
}

export { Navigator }
