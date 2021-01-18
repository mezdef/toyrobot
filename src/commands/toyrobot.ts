import {prompt} from 'inquirer'
import {Command, flags} from '@oclif/command'
import readPipe from '../stdin'
import * as fs from 'fs'
import {processTextInput} from '../exports/processes'

export default class Toyrobot extends Command {
  static description = "It's a robot!"

  static flags = {
    help: flags.help({char: 'h'}),
    version: flags.version({char: 'v'}),
    text: flags.string({char: 't'}),
    file: flags.string({char: 'f'}),
    editor: flags.boolean({
      char: 'e',
      default: false,
    }),
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

    // Wait for File flag, else read data from editor input
    if (flags.text) {
      process.stdout.write(processTextInput({commands: flags.text}))
    } else if (flags.file) {
      process.stdout.write(processTextInput({commands: fs.readFileSync(flags.file, {encoding: 'utf-8'})}))
    } else if (flags.editor) {
      process.stdout.write(await processTextInput(await this.getInteractiveArgs()))
    } else {
      const pipeInput = await readPipe()
      if (pipeInput) process.stdout.write(processTextInput({commands: pipeInput}))
    }
  }
}
