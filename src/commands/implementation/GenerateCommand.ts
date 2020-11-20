import { BaseCommand } from '../BaseCommand';


export default class GenerateCommand implements BaseCommand {
    command: string = 'generate <type> [filepath]';
    alias = 'g';
    handler(type, filePath, args) {
        console.log('g', type, filePath)
    }
}


