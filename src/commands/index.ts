import commander from 'commander';
import path from 'path';
import fs from 'fs';
import InitCommand from './implementation/InitCommand';

export class CommandManager {
    private static program: commander.Command;
    static init() {
        this.program = commander.createCommand()
        // const cmd = new InitCommand();
        // program.command(cmd.command)
        //     .option('--arg1', 'hehe')
        //     .action(cmd.handler)
        const cmdPath = path.join(__dirname, './implementation');
        const files = fs.readdirSync(cmdPath);

        for (const file of files) {
            const filePath = path.join(cmdPath, file);
            if (fs.statSync(filePath).isFile()) {
                this.register(filePath);
            }
        }
        this.program.parse(process.argv)
    }

    static register(file: string) {
        const pkg = require(file);
        const Command = pkg.default;
        const cmd = new Command();
        const cmder = this.program.command(cmd.command)
            .action(cmd.handler.bind(cmd));
        if (cmd?.alias) {
            cmder.alias(cmd.alias);
        }
        if (cmd?.description) {
            if (cmd?.optionDescription) {
                cmder.description(cmd.description, cmd.optionDescription);
            } else {
                cmder.description(cmd.description);
            }
        }
        
    }

}
