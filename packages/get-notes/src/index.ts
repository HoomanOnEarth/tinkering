import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import { isMyLocalMacbook, isMarkdown } from '@me/utils'

type OrderBy = 'NEWEST FIRST' | 'OLDEST FIRST'

export type Note = {
  filename: string
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
}

export type NoteStats = {
  createdAt: string
  updatedAt: string
}

export function getStats(directory: string) {
  return (filename: string) => fs.statSync(path.join(directory, filename))
}

export function saveStats(name: string, stats: NoteStats[]) {
  fs.writeFileSync(name, JSON.stringify(stats))
  // eslint-disable-next-line no-console
  console.log('%s saved!', name)
}

function sortByCreateAt(notes: Note[], orderBy: OrderBy): Note[] {
  return notes.sort((current, next) => {
    if (!current.createdAt || !next.createdAt) return -1
    const currentCreatedAt = new Date(current.createdAt).getTime()
    const nextCreatedAt = new Date(next.createdAt).getTime()
    return orderBy === 'NEWEST FIRST'
      ? nextCreatedAt - currentCreatedAt
      : currentCreatedAt - nextCreatedAt
  })
}

export function addStatsToNotes(notes: Note[], stats: NoteStats[]) {
  return notes.map((note, index) => ({
    ...note,
    createdAt: stats[index].createdAt,
    updatedAt: stats[index].updatedAt,
  }))
}

export function getNotes(notesDir: string, orderBy: OrderBy = 'NEWEST FIRST') {
  const noteDirectory = path.join(process.cwd(), notesDir)

  // names
  const markdownFiles = fs.readdirSync(noteDirectory).filter(isMarkdown)

  const notes: Note[] = markdownFiles.map((filename) => {
    const filePath = path.join(noteDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const frontmatter = matter(fileContents)

    return {
      filename,
      title: frontmatter.data.title,
      content: new MarkdownIt().render(frontmatter.content),
    }
  })

  // metadata about time created, time updated
  const getNoteStats = getStats(noteDirectory)
  const noteStatsPath = path.resolve(
    __dirname,
    '../../../../../.note-stats.json'
  )
  const stats = isMyLocalMacbook()
    ? markdownFiles.map(getNoteStats).map(({ ctime, mtime }, index) => ({
        filename: markdownFiles[index],
        createdAt: ctime.toISOString(),
        updatedAt: mtime.toISOString(),
      }))
    : JSON.parse(fs.readFileSync(noteStatsPath, 'utf8'))

  return sortByCreateAt(addStatsToNotes(notes, stats), orderBy)
}
