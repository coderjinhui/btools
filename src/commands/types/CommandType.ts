export namespace CommandType {
    // database types
    export const DBTypes = [
        {
            name: 'MySQL',
            value: 'mysql'
        },
        {
            name: 'PostgreSQL',
            value: 'postgres'
        },
        {
            name: 'Microsoft SQL Server',
            value: 'mssql'
        },
        {
            name: 'Oracle',
            value: 'oracle'
        },
        {
            name: 'MongoDB',
            value: 'mongodb'
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
            name: 'CockroachDB',
            value: 'cockroachdb'
        },
        {
            name: 'sql.js',
            value: 'sql.js'
        },
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
            // disabled: true
        },
        {
            name: 'Node',
            value: 'none'
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