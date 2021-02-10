import {prompt} from 'inquirer'
import {Command, flags} from '@oclif/command'
import readPipe from '../stdin'
import {Robot} from '../exports/robot'

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
    const robot = new Robot()
    if (flags.text) {
      await robot.input(flags.text, 'string')
    } else if (flags.file) {
      await robot.input(flags.file, 'file')
    } else if (flags.editor) {
      await robot.input(await this.getInteractiveArgs().then((editorInput: any) => {
        return editorInput.commands
      }), 'string')
    } else {
      await robot.input(await readPipe(), 'string')
    }
    robot.output()
  }
}
