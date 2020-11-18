import { BaseCommand } from "./BaseCommand";
import child_process from 'child_process';
import commander from "commander";

export class InstallCommand implements BaseCommand {
    command: string = 'install [packageName]';
    alias = 'i [packageName]';
    optionDescription = [
        {command: '--save-dev', description: 'save package as dev dependency'}
    ]
    handler(packageName, args) {
        // child_process.execSync(`npm install `)
        console.log(packageName, args.opts())
    }
}

const cmd = new InstallCommand();
const program = commander.createCommand()
    
program.command(cmd.command)
    .option("--", cmd.optionDescription["--save-dev, -D"])
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .action(cmd.handler)
    
program.parse(process.argv)