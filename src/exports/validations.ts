import {Position} from './interfaces'
import {tableDim, validInit, validDir, validSequence, validInput} from './variables'

export function isValidInput(inputCmd: string): boolean {
  return Boolean(validInput.indexOf(inputCmd) > -1)
}

export function isValidSequence(inputCmd: string): boolean {
  return Boolean(validSequence.indexOf(inputCmd) > -1)
}

export function isValidDir(dir: string): string {
  return validDir.indexOf(dir) > -1 ? dir : ''
}

export function isValidXY(posXY: Position): boolean {
  return Boolean(!(posXY.x > tableDim.x || posXY.y > tableDim.y) || (posXY.x < 0 || posXY.y < 0))
}

export function isValidPlaceCmd(inputCmds: Array<string>): boolean {
  const posXY: Position = {x: parseInt(inputCmds[1], 10), y: parseInt(inputCmds[2], 10)}
  return Boolean(inputCmds[0] === validInit && !isNaN(posXY.x) && !isNaN(posXY.y) && isValidXY(posXY) && isValidDir(inputCmds[3]))
}
