import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

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
  const filenames = fs.readdirSync(postsDirectory)
  const markdownFiles = filenames.filter(name => name.endsWith('.md'))
  const notes: Note[] = markdownFiles.map(filename => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const stats = fs.statSync(filePath)
    const frontmatter = matter(fileContents)

    return {
      filename,
      title: frontmatter.data.title,
      createdAt: stats.ctime.toDateString(),
      updatedAt: stats.mtime.toDateString(),
      content: new MarkdownIt().render(frontmatter.content),
    }
  })

  return sortByCreateAt(notes, orderBy)
}

export interface Note {
  filename: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}
