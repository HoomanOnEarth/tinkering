import * as fs from 'fs'
import { isMarkdown, getStats, saveStats } from './packages/utils'

// metadata about time created, time updated
const noteDirectory = '_notes'
const getNoteStats = getStats(noteDirectory)
const markdownFiles = fs.readdirSync(noteDirectory).filter(isMarkdown)

const stats = markdownFiles
  .map(getNoteStats)
  .map(({ ctime, mtime }, index) => ({
    filename: markdownFiles[index],
    createdAt: ctime.toISOString(),
    updatedAt: mtime.toISOString(),
  }))

saveStats('.note-stats.json', stats)
