import fs, { Stats } from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import { isMyLocalMacbook, isMarkdown, getStats } from '@me/utils'

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

export function getNotes(notesDir: string, orderBy: OrderBy = 'NEWEST FIRST') {
  const postsDirectory = path.join(process.cwd(), notesDir)

  // names
  const markdownFiles = fs.readdirSync(postsDirectory).filter(isMarkdown)

  const notes: Note[] = markdownFiles.map(filename => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const frontmatter = matter(fileContents)

    return {
      filename,
      title: frontmatter.data.title,
      content: new MarkdownIt().render(frontmatter.content),
    }
  })

  // metadata about time created, time updated
  const stats = markdownFiles.map(getStats(postsDirectory))

  // misc
  const filenames = notes.map(note => note.filename)

  if (isMyLocalMacbook()) {
    const localStats = stats.map(({ ctime, mtime }, index) => ({
      filename: filenames[index],
      createdAt: ctime.toISOString(),
      updatedAt: mtime.toISOString(),
    }))

    saveMyStats(localStats)
  }

  const myStats = fs.readFileSync('.my-stats.json', 'utf8')

  return sortByCreateAt(addStatsToNotes(notes, JSON.parse(myStats)), orderBy)
}

type MyStats = {
  createdAt: string
  updatedAt: string
}

function addStatsToNotes(notes: Note[], stats: MyStats[]) {
  return notes.map((note, index) => ({
    ...note,
    createdAt: stats[index].createdAt,
    updatedAt: stats[index].updatedAt,
  }))
}

function saveMyStats(stats: MyStats[]) {
  fs.writeFileSync('.my-stats.json', JSON.stringify(stats))
  console.log('.my-stats.json saved!')
}

export interface Note {
  filename: string
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
}
