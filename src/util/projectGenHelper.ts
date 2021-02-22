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
            case "express":
                pkg.dependencies = Object.assign(pkg.dependencies, BasePackages[options.backend].packages);
        }

        switch (options.db) {
            case "mysql":
            case "mariadb":
                pkg.dependencies["mysql"] = "^2.14.1";
                break;
            case "postgres":
            case "cockroachdb":
                pkg.dependencies["pg"] = "^8.4.0";
                break;
            case "sqlite":
                pkg.dependencies["sqlite3"] = "^4.0.3";
                break;
            case "better-sqlite3":
                pkg.dependencies["better-sqlite3"] = "^7.0.0";
                break;
            case "oracle":
                pkg.dependencies["oracledb"] = "^1.13.1";
                break;
            case "mssql":
                pkg.dependencies["mssql"] = "^4.0.4";
                break;
            case "mongodb":
                pkg.dependencies["mongodb"] = "^3.0.8";
                break;
        }

        fs.writeFileSync(path.join(projcetRoot, "package.json"), JSON.stringify(pkg, null, 2));
    }

    createORMConfig(projcetRoot: string, database: string) {
        const options: {[key: string]: string} = {};
        switch (database) {
            case "mysql":
                Object.assign(options, {
                    type: "mysql",
                    host: "localhost",
                    port: 3306,
                    username: "test",
                    password: "test",
                    database: "test",
                });
                break;
            case "mariadb":
                Object.assign(options, {
                    type: "mariadb",
                    host: "localhost",
                    port: 3306,
                    username: "test",
                    password: "test",
                    database: "test",
                });
                break;
            case "sqlite":
                Object.assign(options, {
                    type: "sqlite",
                    "database": "database.sqlite",
                });
                break;
            case "better-sqlite3":
                Object.assign(options, {
                    type: "better-sqlite3",
                    "database": "database.sqlite",
                });
                break;
            case "postgres":
                Object.assign(options, {
                    "type": "postgres",
                    "host": "localhost",
                    "port": 5432,
                    "username": "test",
                    "password": "test",
                    "database": "test",
                });
                break;
            case "cockroachdb":
                Object.assign(options, {
                    "type": "cockroachdb",
                    "host": "localhost",
                    "port": 26257,
                    "username": "root",
                    "password": "",
                    "database": "defaultdb",
                });
                break;
            case "mssql":
                Object.assign(options, {
                    "type": "mssql",
                    "host": "localhost",
                    "username": "sa",
                    "password": "Admin12345",
                    "database": "tempdb",
                });
                break;
            case "oracle":
                Object.assign(options, {
                    "type": "oracle",
                    "host": "localhost",
                    "username": "system",
                    "password": "oracle",
                    "port": 1521,
                    "sid": "xe.oracle.docker",
                });
                break;
            case "mongodb":
                Object.assign(options, {
                    "type": "mongodb",
                    "database": "test",
                });
                break;
        }
        Object.assign(options, {
            synchronize: true,
            logging: false,
            entities: [
                "src/db/entity/**/*.ts"
            ],
            migrations: [
                "src/db/migration/**/*.ts"
            ],
            subscribers: [
                "src/db/subscriber/**/*.ts"
            ],
            cli: {
                entitiesDir: "src/db/entity",
                migrationsDir: "src/db/migration",
                subscribersDir: "src/db/subscriber"
            }
        });
        const ormConfigPath = path.join(projcetRoot, 'ormconfig.json');
        fs.writeFileSync(ormConfigPath, JSON.stringify(options, null, 2));
    }

    installPackage(projectRoot: string) {
        try {
            execSync(`yarn install`, {
                stdio: "inherit",
                cwd: projectRoot
            });
        } catch {
            execSync(`npm install`, {
                stdio: "inherit",
                cwd: projectRoot
            });
        }
    }

    copySrc(projcetRoot: string, type: 'koa'|'express') {
        const target = path.join(projcetRoot, 'src');
        let src = '';
        switch (type) {
            case 'express':
                src = 'dist/templates/srcExpress/**/*.!(png)';
                break;
            case 'koa':
                src = 'dist/templates/srcKoa/**/*.!(png)';
                break;
        }
        Template.copyFolder(src, target);
    }

    // createORMDB(projectRoot: string, dbtype: string) {
    //     execSync(`npx typeorm init --database ${dbtype}`, {
    //         stdio: "inherit",
    //         cwd: projectRoot
    //     });
    //     const configPath = path.join(projectRoot, 'ormconfig.json');
    //     const config = require(configPath);
        
    //     config.cli = {
    //         entitiesDir: 'src/db/entity',
    //         migrationsDir: 'src/db/migration',
    //         subscribersDir: 'src/db/subscriber'
    //     }
    //     config.entities[0] = path.join(config.cli.entitiesDir, '**/*.ts');
    //     config.migrations[0] = path.join(config.cli.migrationsDir, '**/*.ts');
    //     config.subscribers[0] = path.join(config.cli.subscribersDir, '**/*.ts');

    //     fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    // }

}