import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { BasePackages } from "../templates/base";

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
        const configPath = path.join(projectRoot, 'ormconfig.json');
        const config = require(configPath);
        
        config.cli = {
            entitiesDir: 'src/db/entity',
            migrationsDir: 'src/db/migration',
            subscribersDir: 'src/db/subscriber'
        }
        config.entities[0] = path.join(config.cli.entitiesDir, '**/*.ts');
        config.migrations[0] = path.join(config.cli.migrationsDir, '**/*.ts');
        config.subscribers[0] = path.join(config.cli.subscribersDir, '**/*.ts');

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    }

}