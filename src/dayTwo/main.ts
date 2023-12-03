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
