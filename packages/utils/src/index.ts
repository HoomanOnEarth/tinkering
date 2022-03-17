import path from 'path'
import fs from 'fs'
import os from 'os'

export function isMyLocalMacbook() {
  return os.hostname() === 'Spark.local' && os.userInfo().username === 'alex'
}

export function getStats(directory: string) {
  return (filename: string) => fs.statSync(path.join(directory, filename))
}

export function isMarkdown(filename: string) {
  return filename.endsWith('.md')
}
