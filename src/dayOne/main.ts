import path from 'path'
import { readFileToLineArray } from '../common/helpers'

export const partOne = (): void => {
  const inputLines = readFileToLineArray(path.join(__dirname, 'input.txt'))

  let sum = 0

  inputLines.forEach((line) => {
    let firstDigit = '0'
    let secondDigit = '0'

    for (const char of line) {
      if (isNaN(parseInt(char))) {
        continue
      }

      if (firstDigit === '0') {
        firstDigit = char
      }
      secondDigit = char
    }

    sum += parseInt(firstDigit + secondDigit)
  })

  console.log(sum)
}

const numberMap = new Map([
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9']
])

// returns string representation of digit, ex: '5',
// or null if string doesn't start with a digit
const getDigitAtStart = (str: string): string | null => {
  if (!isNaN(parseInt(str[0]))) {
    // found numerical digit
    return str[0]
  }

  // looking for word digit
  for (const [word, digit] of numberMap) {
    if (str.startsWith(word)) {
      return digit
    }
  }

  return null
}

export const partTwo = (): void => {
  const inputLines = readFileToLineArray(path.join(__dirname, 'input.txt'))

  let sum = 0

  inputLines.forEach((line) => {
    let firstDigit = 'unfound'
    let secondDigit = 'unfound'

    // forward pass
    for (let i = 0; i < line.length; i++) {
      const digit = getDigitAtStart(line.substring(i))
      if (digit !== null) {
        firstDigit = digit
        break
      }
    }

    // backward pass
    for (let i = line.length - 1; i >= 0; i--) {
      const digit = getDigitAtStart(line.substring(i))
      // if there is only one digit in the line, we'll eventually get to it
      if (digit !== null) {
        secondDigit = digit
        break
      }
    }

    sum += parseInt(firstDigit + secondDigit)
  })

  console.log(sum)
}
