import path from 'path'
import fs from 'fs'
import os from 'os'

export function isMyLocalMacbook() {
  return os.hostname() === 'Spark.local' && os.userInfo().username === 'alex'
}

export function getStats(postsDirectory: string) {
  return (filename: string) => fs.statSync(path.join(postsDirectory, filename))
}

export function isMarkdown(filename: string) {
  return filename.endsWith('.md')
}
