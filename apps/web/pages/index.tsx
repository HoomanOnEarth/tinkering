import styles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import { getNotes, Note } from '@me/get-notes'
import { localeDate } from '@me/utils/date'
import { useScrollToTop, useCursor } from '../hooks'
import { ArticleHeadMetaTags } from '../components/ArticleMetaTags'

interface HomeProps {
  notes: Note[]
}

const Home: NextPage<HomeProps> = ({ notes = [] }) => {
  const total = notes.length
  const {
    index: current,
    isHead: isLatest,
    isTail: isOldest,
    currentLabel,
    goNext,
    goPrevious,
  } = useCursor(total)

  useScrollToTop('top', current)

  const note = notes[current]
  const metaLabel = isLatest ? 'Bài mới nhất' : `Bài ${currentLabel}`

  const rightButtonLabel = isLatest ? 'Đọc từ đầu?' : 'Đọc bài kế tiếp'
  const leftButtonLabel = isOldest ? 'Đọc bài mới nhất?' : 'Đọc bài trước'

  return (
    <div className={styles.container}>
      <ArticleHeadMetaTags
        title={note.title}
        updatedAt={note.updatedAt}
        createdAt={note.createdAt}
      />

      <div id="top" className={styles.meta}>
        <em>{metaLabel}</em>
        <time>{localeDate(note.createdAt)}</time>
      </div>

      <div className={styles.note}>
        <h1 className={styles.title}>{note.title}</h1>
        <article
          className={styles.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </div>

      <div className={styles.bar}>
        <div className={styles.controls}>
          <button type="button" onClick={() => goPrevious()}>
            {leftButtonLabel}
          </button>
          <button type="button" onClick={() => goNext()}>
            {rightButtonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notes: getNotes('../../_notes'),
    },
  }
}

export default Home
