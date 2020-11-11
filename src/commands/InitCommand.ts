import { BaseCommand } from './BaseCommand';
import commander from 'commander';
// const InitCommand = program.command('init <operation> [filepath]')
//     .action(function(operation, filepath) {
//         console.log(operation, filepath);
//     })
//     .aliases(['i', 'k'])
//     .option('--name1', 'dfgsdfg')
//     .description('22222', {'name1': 'name of args'})

class InitCommand implements BaseCommand {
    command: string = 'init [filepath]';
    handler(filepath, args) {
        console.log('init', filepath)
    }
}
const cmd = new InitCommand();
const program = commander.createCommand()
    
program.command(cmd.command)
    .option('--arg1', 'hehe')
    .action(cmd.handler)
    
program.parse(process.argv)

