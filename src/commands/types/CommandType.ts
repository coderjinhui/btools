export namespace CommandType {
    // database types
    export const DBTypes = [
        {
            name: 'MySQL',
            value: 'mysql'
        },
        {
            name: 'MariaDB',
            value: 'mariadb'
        },
        {
            name: 'SQLite',
            value: 'sqlite'
        },
        {
            name: 'SQLite3',
            value: 'better-sqlite3'
        },
        {
            name: 'PostgreSQL',
            value: 'postgres'
        },
        {
            name: 'CockroachDB',
            value: 'cockroachdb'
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
            value: 'oracle'
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