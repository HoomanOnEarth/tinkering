import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { getNotes, Note } from 'get-notes'

interface HomeProps {
  notes: Note[]
}

function localeDate(dateISO: string) {
  return new Date(dateISO).toDateString()
}

const Home: NextPage<HomeProps> = ({ notes = [] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.notes}>
        {notes.map((note: Note) => (
          <div key={note.filename}>
            <h5 className={styles.note_meta}>{localeDate(note.createdAt)}</h5>
            <h1 className={styles.note_title}>{note.title}</h1>
            <div
              className={styles.note_content}
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
          </div>
        ))}
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
