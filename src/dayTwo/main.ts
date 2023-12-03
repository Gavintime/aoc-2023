import path from 'path'
import { readFileToLineArray } from '../common/helpers'

export const partOne = (): void => {
  const inputLines = readFileToLineArray(path.join(__dirname, 'input.txt'))

  const colorMaxMap = new Map([
    ['red', 12],
    ['green', 13],
    ['blue', 14]
  ])

  let sum = 0

  inputLines.forEach((line) => {
    const [gameHeader, gameData] = line.split(': ', 2)

    // we could assume it's the line number, but lets not
    const gameId = parseInt(gameHeader.substring('Game '.length))

    // we don't care about info across sets
    const cubesShown = gameData.split(/, |; /)

    // goto next game before adding game id if count is too high
    for (const countColor of cubesShown) {
      const [countTemp, colorTemp] = countColor.split(' ')
      const count = parseInt(countTemp)
      const color = colorTemp.toLowerCase()

      const colorMax = colorMaxMap.get(color)

      if (colorMax === undefined) {
        throw new Error('Invalid color:' + color)
      }

      // skip current game early, too many shown
      if (count > colorMax) {
        return
      }
    }

    sum += gameId
  })

  console.log(sum)
}

export const partTwo = (): void => {
  const inputLines = readFileToLineArray(path.join(__dirname, 'input.txt'))

  let sum = 0

  inputLines.forEach((line) => {
    // ignore game id
    const gameData = line.split(': ', 2)[1]

    // we don't care about info across sets
    const cubesShown = gameData.split(/, |; /)

    const minCounts = {
      red: 0,
      green: 0,
      blue: 0
    }

    // iterate through all individual color showings for current game
    for (const countColor of cubesShown) {
      const [countTemp, colorTemp] = countColor.split(' ')
      const count = parseInt(countTemp)
      const color = colorTemp.toLowerCase()

      // type narrowing to guarantee valid property access
      if (color !== 'red' && color !== 'green' && color !== 'blue') {
        throw new Error('Invalid Color:' + color)
      }

      if (count > minCounts[color]) {
        minCounts[color] = count
      }
    }

    sum += minCounts.red * minCounts.green * minCounts.blue
  })

  console.log(sum)
}
