import path from 'path'
import fs from 'fs'

export const readFileToLineArray = (filePath: string): string[] => {
  filePath = path.normalize(filePath)
  const inputData = fs.readFileSync(filePath, 'utf8')
  return inputData.split('\n')
}
