const fs = require('fs')
const es = require('event-stream')
const {Readable} = require('stream')
import {validTurn, validMove, validReport} from './variables'
import {Start} from './interfaces'
import {Process} from './process'
import {Validator} from './validation'

class State {
  public tmpPosition: Start;

  public robotOutput: Array<string>;

  public placeFound: boolean;

  constructor() {
    this.tmpPosition = {position: {x: 0, y: 0}, orientation: ''}
    this.robotOutput = []
    this.placeFound = false
  }

  public processChunk(inputChunk: string): void {
    const validInit = Validator.place(inputChunk)
    if (validInit) {
      if (!this.placeFound) this.placeFound = true
      this.tmpPosition = validInit
    }
    if (this.placeFound) {
      if (Validator.sequence(inputChunk)) {
        if (inputChunk === validMove) this.tmpPosition.position = Process.move(this.tmpPosition.position, this.tmpPosition.orientation)
        if (inputChunk === validTurn.l || inputChunk === validTurn.r) {
          this.tmpPosition.orientation = Process.turn(this.tmpPosition.orientation, inputChunk)
        }
        if (inputChunk === validReport) {
          const newLine: string = this.robotOutput.length > 0 ? '\n' : ''
          this.robotOutput.push(newLine + 'Output: ' + this.tmpPosition.position.x + ',' + this.tmpPosition.position.y + ',' + this.tmpPosition.orientation)
        }
      }
    }
  }
}

export class Ingest {
  private static process(text: string) {
    return text.split('\n').filter(item => item)
  }

  public static async string(data: string): Promise<string[]> {
    const process = new State()
    return new Promise(resolve => {
      const readable = Readable.from([data])
      readable
      .on('data', (stringChunk: string) => {
        this.process(stringChunk).forEach((line: string) => {
          process.processChunk(line)
        })
      })
      .on('end', function () {
        resolve(process.robotOutput)
      })
    })
  }

  public static async file(inputData: string): Promise<string[]> {
    const process = new State()
    return new Promise(function (resolve) {
      fs
      .createReadStream(inputData)
      .pipe(es.split())
      .pipe(es.mapSync(function (line: string) {
        process.processChunk(line)
      })
      .on('end', function () {
        resolve(process.robotOutput)
      }))
    })
  }
}

export class Robot {
  private robotOutput: Array<string>

  constructor() {
    this.robotOutput = []
  }

  public output(): void {
    this.robotOutput.forEach((output: string) => {
      process.stdout.write(output)
    })
  }

  public async input(data: any, inputMethod: string): Promise<void> {
    if (inputMethod === 'string') {
      this.robotOutput = await Ingest.string(data)
    } else if (inputMethod === 'file') {
      this.robotOutput = await Ingest.file(data)
    }
  }
}

