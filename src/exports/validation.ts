import {Position} from './interfaces'
import {tableDim, validInit, validDir, validTurn, validSequence} from './variables'

export class Validator {
  public static turnLeft(turn: string): boolean {
    return Boolean(validTurn.l === turn)
  }

  public static turnRight(turn: string): boolean {
    return Boolean(validTurn.r === turn)
  }

  public static xy(input: Position): boolean {
    return Boolean(!((input.x > tableDim.x || input.y > tableDim.y) || (input.x < 0 || input.y < 0)))
  }

  public static orientation(dir: string): string {
    return validDir.indexOf(dir) > -1 ? dir : ''
  }

  public static place(inputCmds: string): any {
    let isValid: any = null
    if (inputCmds.substring(0, 5) === validInit) {
      // const splitByPlace = rawInput.toUpperCase().replace(/\n/g, ' ').split(/(?=PLACE)/g)
      const sanInput = inputCmds.split(/,| /)
      const posXY: Position = {x: parseInt(sanInput[1], 10), y: parseInt(sanInput[2], 10)}
      if (!isNaN(posXY.x) && !isNaN(posXY.y) && this.xy(posXY) && this.orientation(sanInput[3])) isValid = {position: {x: posXY.x, y: posXY.y}, orientation: sanInput[3]}
    }
    return isValid
  }

  public static sequence(inputCmd: string): boolean {
    return Boolean(validSequence.indexOf(inputCmd) > -1)
  }
}
