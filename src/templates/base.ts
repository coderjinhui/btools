export const BasePackages = {
    koa: {
        packages: {
            "koa": "^2.13.0",
            "koa-bodyparser": "^4.3.0",
            "koa-router": "^10.0.0",
            "koa-session": "^6.1.0",
            "koa-static": "^5.0.0",
            "koa2-cors": "^2.0.6",
        },
        type: {
            "@types/koa": "^2.11.6",
            "@types/koa-bodyparser": "^4.3.0",
            "@types/koa-router": "^7.4.1",
            "@types/koa-session": "^5.10.3",
            "@types/koa-static": "^4.0.1",
            "@types/koa2-cors": "^2.0.1",
        }
    },
    typeorm: {
        packages: {
            "reflect-metadata": "^0.1.13",
            "typeorm": "^0.2.29"
        }
    },
    typescript: {
        packages: {
            "typescript": "^4.0.5"
        },
        type: {
            "@types/node": "^14.14.8",
        }
    }
}