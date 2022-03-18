import os from 'os'

export function isMyLocalMacbook() {
  return os.hostname() === 'Spark.local' && os.userInfo().username === 'alex'
}

export function isMarkdown(filename: string) {
  return filename.endsWith('.md')
}
