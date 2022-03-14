import path from 'path'
import fs from 'fs'
import os from 'os'

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

export function isMyLocalMacbook() {
  return os.hostname() === 'Spark.local' && os.userInfo().username === 'alex'
}

export function getStats(directory: string) {
  return (filename: string) => fs.statSync(path.join(directory, filename))
}

export function saveStats(name: string, stats: NoteStats[]) {
  fs.writeFileSync(name, JSON.stringify(stats))
  console.log('%s saved!', name)
}

export function addStatsToNotes(notes: Note[], stats: NoteStats[]) {
  return notes.map((note, index) => ({
    ...note,
    createdAt: stats[index].createdAt,
    updatedAt: stats[index].updatedAt,
  }))
}

export function isMarkdown(filename: string) {
  return filename.endsWith('.md')
}
