import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { getNotes, Note } from 'get-notes'
import { Navigator } from '../components/Navigator'
import { useEffect, useState } from 'react'

interface HomeProps {
  notes: Note[]
}

function localeDate(dateISO: string) {
  return new Date(dateISO).toDateString()
}

const Home: NextPage<HomeProps> = ({ notes = [] }) => {
  const total = notes.length
  const [current, setCurrent] = useState<number>(0)
  const note = notes[current]

  useEffect(() => {
    const { offsetTop } = document.getElementById('top')
    window.scrollTo({ top: offsetTop - 24, behavior: 'smooth' })
  }, [current])

  function handleGoPrev() {
    if (current > 0) setCurrent(current - 1)
  }

  function handleGoNext() {
    if (current < total) setCurrent(current + 1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.notes}>
        <div id="top" key={note.filename}>
          <h5 className={styles.note_meta}>{localeDate(note.createdAt)}</h5>
          <h1 className={styles.note_title}>{note.title}</h1>
          <div
            className={styles.note_content}
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </div>
      </div>

      <Navigator
        total={total}
        current={current}
        latestLabel="Bài mới nhất rồi"
        nextLabel="Đọc bài cũ hơn"
        prevLabel="Quay lại"
        oldestLabel="Hết rồi"
        goPrev={handleGoPrev}
        goNext={handleGoNext}
      />
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
