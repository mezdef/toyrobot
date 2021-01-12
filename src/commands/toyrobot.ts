import {prompt} from 'inquirer'
import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import {processTextInput} from '../exports/processes'

export default class Toyrobot extends Command {
  static description = "It's a robot!"

  static flags = {
    file: flags.string({char: 'f'}),
  }

  async getInteractiveArgs() {
    const answer = await prompt([{
      type: 'editor',
      name: 'commands',
      message: 'Input robot commands:',
      default: '',
    }])
    return answer
  }

  async run() {
    const {flags} = this.parse(Toyrobot)
    let tmpOutput: string

    // Wait for File flag, else read data from editor input
    if (flags.file) {
      tmpOutput = processTextInput({commands: fs.readFileSync(flags.file, {encoding: 'utf-8'})})
      this.log(tmpOutput)
    } else {
      tmpOutput = await processTextInput(await this.getInteractiveArgs())
      this.log(tmpOutput)
    }
  }
}
