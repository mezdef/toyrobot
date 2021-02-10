import {Position} from './interfaces'
import {validDir} from './variables'
import {Validator} from './validation'

export class Process {
  public static placeCmd(inputCmds: Array<string>) {
    return {position: {x: parseInt(inputCmds[1], 10), y: parseInt(inputCmds[2], 10)}, orientation: inputCmds[3]}
  }

  public static turn(currDir: string, turn: string) {
    const currDirNum: number = validDir.indexOf(currDir)
    let newDir = currDir
    function getDir(index: number): string {
      if (index > 3) return validDir[0]
      if (index < 0) return validDir[3]
      return validDir[index]
    }
    if (Validator.turnLeft(turn)) newDir = getDir(currDirNum - 1)
    if (Validator.turnRight(turn)) newDir = getDir(currDirNum + 1)
    return newDir
  }

  public static move(currXY: Position, currDir: string) {
    const tmpXY: Position = {x: currXY.x, y: currXY.y}
    if (currDir === validDir[0]) tmpXY.y++
    if (currDir === validDir[1]) tmpXY.x++
    if (currDir === validDir[2]) tmpXY.y--
    if (currDir === validDir[3]) tmpXY.x--
    return Validator.xy(tmpXY) ? tmpXY : currXY
  }
}
