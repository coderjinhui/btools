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
            fs.mkdirSync(folder);
        }
    }
}

export class Template {
    static copy(fileName: string, distFolder: string, options?: any) {
        const compiled = this.getTemplate(fileName, options);
        const folder = distFolder;
        FileSystem.mkdir(folder);
        fs.writeFileSync(path.join(folder, options?.__targetFile), compiled)
    }

    static getTemplate(fileName: string, options?: any) {
        const file = path.join(template_folder, fileName);
        const content = fs.readFileSync(file, 'utf-8');
        const compiled = template(content)(options);
        return compiled;
    }
}
