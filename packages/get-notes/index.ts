import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import type { Note } from '@me/utils'
import { isMyLocalMacbook, isMarkdown, getStats, addStatsToNotes } from '@me/utils'

type OrderBy = 'NEWEST FIRST' | 'OLDEST FIRST'

function sortByCreateAt(notes: Note[], orderBy: OrderBy): Note[] {
  return notes.sort((current, next) => {
    const currentCreatedAt = new Date(current.createdAt).getTime()
    const nextCreatedAt = new Date(next.createdAt).getTime()
    return orderBy === 'NEWEST FIRST'
      ? nextCreatedAt - currentCreatedAt
      : currentCreatedAt - nextCreatedAt
  })
}

export { Note }

export function getNotes(notesDir: string, orderBy: OrderBy = 'NEWEST FIRST') {
  const noteDirectory = path.join(process.cwd(), notesDir)

  // names
  const markdownFiles = fs.readdirSync(noteDirectory).filter(isMarkdown)

  const notes: Note[] = markdownFiles.map(filename => {
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
  const stats = isMyLocalMacbook()
  ? markdownFiles.map(getNoteStats).map(({ ctime, mtime }, index) => ({
      filename: markdownFiles[index],
      createdAt: ctime.toISOString(),
      updatedAt: mtime.toISOString(),
    }))
  : JSON.parse(fs.readFileSync('.note-stats.json', 'utf8'))

  return sortByCreateAt(addStatsToNotes(notes, stats), orderBy)
}

