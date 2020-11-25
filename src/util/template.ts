import template from 'lodash.template';
import fs from 'fs';
import path from 'path';

const root = path.join(__dirname, '../../');
const template_folder = path.join(__dirname, '../templates');

export class FileSystem {
    static mkdir(dir: string, needCreate?: string[]) {
        if (!needCreate) {
            needCreate = [];
        }
        if (!fs.existsSync(dir)) {
            needCreate.unshift(dir);
            dir = path.join(dir, '../');
            this.mkdir(dir, needCreate);
            return;
        }

        for (const folder of needCreate) {
            console.log(needCreate)
            fs.mkdirSync(folder);
        }
    }
}

export class Template {
    static copy(fileName: string, distFolder: string, options?: object) {
        const file = path.join(template_folder, fileName);
        const content = fs.readFileSync(file, 'utf-8');
        const compiled = template(content)(options);
        const folder = path.join(root, distFolder);
        FileSystem.mkdir(folder);
        fs.writeFileSync(path.join(folder, fileName), compiled)
    }
}
