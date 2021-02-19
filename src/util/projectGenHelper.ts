import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { BasePackages } from "../templates/base";
import cpy from 'cpy';

import { Template } from "./template";

export class ProjectGen {
    private static instance: ProjectGen = null;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    createPackage(options: { [key: string]: any }) {
        const { projcetRoot } = options;
        const pkgName = path.basename(projcetRoot);
        
        const content = Template.getTemplate("package.template.json", {
            name: pkgName
        });
        const pkg = JSON.parse(content);

        pkg.devDependencies = Object.assign(pkg.devDependencies, BasePackages.typeorm.packages);

        if (options.typescript) {
            pkg.devDependencies = Object.assign(pkg.devDependencies, BasePackages.typescript.packages);
            pkg.devDependencies = Object.assign(pkg.devDependencies, BasePackages.typescript.type);
            Template.copy("tsconfig.json", projcetRoot, {
                __targetFile: "tsconfig.json"
            });
        }

        switch (options.backend) {
            case "koa":
                pkg.dependencies = Object.assign(pkg.dependencies, BasePackages[options.backend].packages);
                if (options.typescript) {
                    pkg.devDependencies = Object.assign(pkg.devDependencies, BasePackages[options.backend].type || {});
                }
                break;
        }

        fs.writeFileSync(path.join(projcetRoot, "package.json"), JSON.stringify(pkg, null, 2));
    }

    installPackage(projectRoot: string) {
        execSync(`npm install`, {
            stdio: "inherit",
            cwd: projectRoot
        });
    }

    createORMDB(projectRoot: string, dbtype: string) {
        execSync(`npx typeorm init --database ${dbtype}`, {
            stdio: "inherit",
            cwd: projectRoot
        });
    }

    async createTemplateFolder(projectRoot: string) {
        await Template.copyFolder('src/template/srcKoa', path.join(projectRoot, 'src'));
    }

}