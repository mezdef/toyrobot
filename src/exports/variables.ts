export const tableDim = {x: 4, y: 4}
export const validInit = 'PLACE'
export const validDir = ['NORTH', 'EAST', 'SOUTH', 'WEST']
export const validTurn = {l: 'LEFT', r: 'RIGHT'}
export const validMove = 'MOVE'
export const validReport = 'REPORT'
export const validSequence = [validMove, validTurn.l, validTurn.r, validReport]
export const validInput = [validInit, validDir[0], validDir[1], validDir[2], validDir[3], validTurn.l, validTurn.r, validMove, validReport]
