import { BaseCommand } from '../BaseCommand';
import inquirer from 'inquirer';
import { CommandType } from '../types/CommandType';
import path from 'path';
import fs from 'fs';
import { FileSystem, Template } from '../../util/template';
import { ProjectGen } from '../../util/projectGenHelper';


// const InitCommand = program.command('init <operation> [filepath]')
//     .action(function(operation, filepath) {
//         console.log(operation, filepath);
//     })
//     .aliases(['i', 'k'])
//     .option('--name1', 'dfgsdfg')
//     .description('22222', {'name1': 'name of args'})

export default class InitCommand implements BaseCommand {
    command: string = 'init [filepath]';

    private async askDefault() {
        const answer = await inquirer.prompt({
            type: 'list',
            message: 'Create project with all default?',
            name: 'default',
            choices: CommandType.InitMode,
        })
        return answer.default;
    }

    private async askCustomize() {
        const answer = await inquirer.prompt([
            {
                type: 'confirm',
                message: 'Do you want to use TypeScript?',
                default: true,
                name: 'typescript',
            },
            {
                type: 'list',
                name: 'backend',
                message: 'Choose backend framework',
                choices: CommandType.BackendFrameworks
            },
            {
                type: 'list',
                name: 'db',
                message: 'Choose a DB type',
                choices: CommandType.DBTypes
            }
        ])
        return answer;
    }

    async handler(filepath, args) {
        if (!filepath) {
            filepath = './';
        }
        const fullPath = path.join(process.cwd(), filepath);
        // target folder not exist, create the folder
        if (!fs.existsSync(fullPath)) {
            console.log(fullPath, "create")
            FileSystem.mkdir(fullPath);
        }
        // target folder exist, check it is empty
        const files = fs.readdirSync(fullPath);
        // if not empty, reject the init process
        if (files.length) {
            console.log("Target folder is not empty!");
            return;
        }

        const isDefault = await this.askDefault();
        let config: any = {
            typescript: true,
            backend: 'koa',
            db: 'mysql'
        };
        if (!isDefault) {
            config = await this.askCustomize();
        }

        config.projcetRoot = fullPath;

        ProjectGen.Instance.createPackage(config);
        ProjectGen.Instance.installPackage(fullPath);
        ProjectGen.Instance.createORMDB(fullPath, config.db)

        // create the folders
        // copy template files

    }
}

// inquirer.prompt([{
//     type: 'list',
//     message: '',
//     name: 'default',
//     choices: CommandType.InitMode,
// },
// {
//     type: 'input',
//     name: 'aa',
//     message: 'auth',
//     when: function(answer) {
//         return answer.default === true
//     }
// },
// {
//     type: 'input',
//     name: 'bb',
//     message: 'auth2',
//     when: function(answer) {
//         return answer.default === true
//     }
// }]).then(console.log)

// inquirer.prompt([
//     {
//         type: 'confirm',
//         message: 'Do you want to use TypeScript?',
//         default: true,
//         name: 'typescript',
//     },
//     {
//         type: 'list',
//         name: 'backend',
//         message: 'Choose backend framework',
//         choices: CommandType.BackendFrameworks
//     },
//     {
//         type: 'list',
//         name: 'db',
//         message: 'Choose a DB type',
//         choices: CommandType.DBTypes
//     }
// ]).then(console.log)