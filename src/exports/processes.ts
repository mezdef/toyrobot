import {TextInput, Position, Instructions} from './interfaces'
import {validDir, validInit, validTurn, validInput} from './variables'
import {isValidXY, isValidSequence, isValidPlaceCmd} from './validations'

// Input turn command output new direction
export function processTurn(currDir: string, turn: string): string {
  const currDirNum: number = validDir.indexOf(currDir)
  let newDir = currDir
  function getDir(index: number): string {
    if (index > 3) return validDir[0]
    if (index < 0) return validDir[3]
    return validDir[index]
  }
  if (turn === validTurn.l) newDir = getDir(currDirNum - 1)
  if (turn === validTurn.r) newDir = getDir(currDirNum + 1)
  return newDir
}

// Input move command, output new position
export function processMove(currXY: Position, currDir: string): Position {
  const tmpXY: Position = {x: currXY.x, y: currXY.y}
  if (currDir === validDir[0]) tmpXY.y++
  if (currDir === validDir[1]) tmpXY.x++
  if (currDir === validDir[2]) tmpXY.y--
  if (currDir === validDir[3]) tmpXY.x--
  return isValidXY(tmpXY) ? tmpXY : currXY
}

// Process list of commands from text input and output new position ref and orientation on report
export function processCommands(instructionSets: Array<Instructions>) {
  let tempOutput = ''
  instructionSets.forEach(instructions => {
    const temp = {position: instructions.start.position, direction: instructions.start.direction}
    instructions.commands.forEach(command => {
      if (command === 'MOVE') temp.position = processMove(temp.position, temp.direction)
      if (command === validTurn.l || command === validTurn.r) {
        temp.direction = processTurn(temp.direction, command)
      }
      if (command === 'REPORT') tempOutput += 'Output: ' + temp.position.x + ',' + temp.position.y + ',' + temp.direction + '\n'
    })
  })
  return tempOutput
}

// Format place command for reading
export function formatPlaceCmd(inputCmds: Array<string>) {
  return {position: {x: parseInt(inputCmds[1], 10), y: parseInt(inputCmds[2], 10)}, direction: inputCmds[3]}
}

// Take plain text input and format for reading
export function sanitizeInput(rawInput: string) {
  const groupedCommands: Array<Array<string>> = []
  const splitByPlace = rawInput.toUpperCase().replace(/\n/g, ' ').split(/(?=PLACE)/g)
  splitByPlace.forEach(textItem => {
    if (textItem.substring(0, 5) === validInit) {
      const sanInput = textItem.split(/,| /).filter(function (cmd: string) {
        if (cmd === '') return false
        return (Boolean((validInput.indexOf(cmd) !== -1) || !isNaN(parseInt(cmd, 10))))
      })
      groupedCommands.push(sanInput)
    }
  })
  return groupedCommands
}

export function processTextInput(input: TextInput) {
  const robotInput = sanitizeInput(input.commands)
  const robotInstructions: Array<Instructions> = []
  // Itterate over input lines to find the first PLACE
  robotInput.forEach(textArray => {
    const tempInstructions: Instructions = {commands: [], start: {position: {x: 0, y: 0}, direction: ''}}
    const placeinstructions: Array<string> = textArray.slice(0, 4)
    if (isValidPlaceCmd(placeinstructions)) {
      if (isValidPlaceCmd(placeinstructions)) tempInstructions.start = formatPlaceCmd(placeinstructions)
      textArray.forEach(textItem => {
        if (isValidSequence(textItem)) tempInstructions.commands.push(textItem)
      })
      robotInstructions.push(tempInstructions)
    }
  })
  return robotInstructions.length === 0 ? '' : processCommands(robotInstructions)
}
