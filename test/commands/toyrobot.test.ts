import {expect, test} from '@oclif/test'
// import {tableDim} from '../../src/exports/variables'

describe('Placing', () => {
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/place-1.txt'])
  .it('places on grid', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 4,4,EAST')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/place-2.txt'])
  .it('does not place off grid x', async function (ctx) {
    await expect(ctx.stdout).to.contain('\n')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/place-3.txt'])
  .it('does not place off grid y', async function (ctx) {
    await expect(ctx.stdout).to.contain('\n')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/place-4.txt'])
  .it('does not place with negative XY', async function (ctx) {
    await expect(ctx.stdout).to.contain('\n')
  })
})

describe('Moving', () => {
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/move-1.txt'])
  .it('moves to the north', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,1,NORTH')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/move-2.txt'])
  .it('moves to the east', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 1,1,EAST')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/move-3.txt'])
  .it('moves to the south', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 1,0,SOUTH')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/move-4.txt'])
  .it('moves to the west', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,0,WEST')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/move-5.txt'])
  .it('does not move off grid', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 4,4,NORTH')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/move-6.txt'])
  .it('does not move off grid and keeps moving', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 4,2,SOUTH')
  })
})

describe('Turning', () => {
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/turn-1.txt'])
  .it('turns to the left', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,0,WEST')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/turn-2.txt'])
  .it('turns to the right', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,0,EAST')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/turn-3.txt'])
  .it('turns twice', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,0,SOUTH')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/turn-4.txt'])
  .it('turns 360 left', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,0,NORTH')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/turn-5.txt'])
  .it('turns 360 right', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,0,NORTH')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/turn-6.txt'])
  .it('turns passed north and back', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,0,EAST')
  })
})

describe('Reporting', () => {
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/report-1.txt'])
  .it('ignores report when not placed', function (ctx) {
    expect(ctx.stdout).to.contain('\n')
  })
})

describe('Input Variations', () => {
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/input-1.txt'])
  .it('ignores commands before PLACE', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,1,NORTH')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/input-2.txt'])
  .it('rejects bad PLACE command', function (ctx) {
    expect(ctx.stdout).to.contain('\n')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/input-3.txt'])
  .it('handles multiple PLACE commands', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 0,1,NORTH')
  })
  test
  .stdout()
  .command(['toyrobot', '-f', './src/test/input-4.txt'])
  .it('handles multiple REPORT commands', function (ctx) {
    expect(ctx.stdout).to.contain('Output: 2,1,NORTH\nOutput: 0,1,NORTH')
  })
})
