export namespace CommandType {
    // database types
    export const DBTypes = [
        {
            name: 'MySQL / MariaDB',
            value: 'mysql2'
        },
        {
            name: 'PostgreSQL / CockroachDB',
            value: 'pg'
        },
        {
            name: 'SQLite',
            value: 'sqlite3'
        },
        {
            name: 'Microsoft SQL Server',
            value: 'mssql'
        },
        {
            name: 'sql.js',
            value: 'sql.js'
        },
        {
            name: 'Oracle',
            value: 'oracledb'
        },
        {
            name: 'MongoDB',
            value: 'mongodb'
        }
    ]

    // backend framework types
    export const BackendFrameworks = [
        {
            name: 'Koa',
            value: 'koa'
        },
        {
            name: 'Express',
            value: 'express',
            disabled: true
        }
    ]

    // project init mode
    export const InitMode = [
        {
            name: 'All Default',
            value: true
        },
        {
            name: 'Use Customize',
            value: false
        }
    ]
}