import { ReactElement } from 'react'
import styles from './Navigator.module.css'

type BottomBarProps = {
  children: ReactElement<HTMLElement>
}

function BottomBar({ children }: BottomBarProps) {
  return <div className={styles.wrapper}>{children}</div>
}

export { BottomBar }
