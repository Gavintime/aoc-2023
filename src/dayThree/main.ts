import path from 'path'
import { readFileToLineArray } from '../common/helpers'

// return true if char given that's not a digit or period
function isSymbol (char: string | undefined): boolean {
  if (char === undefined || char.length !== 1) {
    return false
  }

  return !/\d|\./.test(char)
}

// https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
function countDigits (num: number): number {
  // this is way cooler than num.toString().length
  // B)
  return Math.log(num) * Math.LOG10E + 1 | 0
}

export const partOne = (): void => {
  const inputData = readFileToLineArray(path.join(__dirname, 'input.txt'))

  let sum = 0

  // iterate through data char by char, assume all lines are equal length
  // find a number, then search around it for a "symbol"
  // symbol = any char other than digit or period
  // y = row, x = col
  for (let y = 0; y < inputData.length; y++) {
    // records start of current possible number
    let numberStartIndex = -1

    for (let x = 0; x < inputData[0].length; x++) {
      // skip if not a digit
      if (!/^\d$/.test(inputData[y][x])) {
        numberStartIndex = -1
        continue
      }

      // digit found, record start and begin looking for symbol
      if (numberStartIndex === -1) {
        numberStartIndex = x
      }

      // check cardinal/subcardinal directions for symbol
      let symbolFound = false
      for (const i of [-1, 0, 1]) {
        for (const j of [-1, 0, 1]) {
          // ?. resolves to undefined if outer array index doesn't exist
          // we also check for undefined in isSymbol
          // together, these mean we don't have to check if indexes are valid
          if (isSymbol(inputData[y + i]?.[x + j])) {
            symbolFound = true
            break
          }
        }
        if (symbolFound) {
          break
        }
      }

      if (symbolFound) {
        const num = parseInt(inputData[y].substring(numberStartIndex))
        sum += num
        // after +=1 from the for loop, this will place us at the next possible start of a number
        x = numberStartIndex + countDigits(num)
        numberStartIndex = -1
      }
    }
  }

  console.log(sum)
}
