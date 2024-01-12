import fs from 'node:fs';
import sqlite, { open, ISqlite } from 'sqlite';
import sqlite3 from 'sqlite3';

export class DatabaseService {
    private static DB_PATH = process.cwd() + '/database/database.db';
    private static INIT_FILE = process.cwd() + '/database/init.sql';

    private static db: sqlite.Database;

    constructor() {}

    /**
     * Open a connection to the database.
     * @param filepath The path to the database file.
     */
    public static async open(filepath?: string): Promise<void> {
        this.db = await open({
            filename: filepath || this.DB_PATH,
            driver: sqlite3.Database,
        });
    }


    /**
     * Close the database connection.
     */
    public static async close(): Promise<void> {
        if (!this.db) throw new Error('No database connection');
        await this.db.close();
    }


    /**
     * Initialize the database by running the init.sql file.
     * - If the initFilePath parameter is provided, the file at that path will be used instead of the default init.sql file.
     * - If the query parameter is provided, that SQL query will be run instead of the init.sql file.
     * - If neither parameter is provided, the default init.sql file will be used.
     * - Database is cleared before running the init query.
     * @param params The init parameters.
     * @param params.initFilePath The path to the init.sql file.
     * @param params.query The SQL query to run instead of the init.sql file.
     */
    public static async init(params?: { initFilePath?: string } | { query?: string; }): Promise<void> {
        let sql = '';
        if (params['query']) sql = params['query'];
        else sql = fs.readFileSync(params['initFilePath'] || this.INIT_FILE, 'utf8');

        try {
            await this.db.exec(sql);
        } catch (error) {
            throw new Error('Error initializing database:' + error.message);
        }
    }


    /**
     * Execute a SQL query on the database.
     * @param sql The SQL query.
     * @param params The query parameters.
     * @returns The result.
     */
    public static exec(sql: ISqlite.SqlType, ...params: any[]): Promise<ISqlite.RunResult> {
        if (!this.db) throw new Error('No database connection');
        return this.db.run(sql, ...params);
    }


    /**
     * Get a single row from the database.
     * @param sql The SQL query.
     * @param params The query parameters.
     * @returns The row.
     */
    public static get<T = any>(sql: ISqlite.SqlType, ...params: any[]): Promise<T | undefined> {
        if (!this.db) throw new Error('No database connection');
        return this.db.get(sql, ...params);
    }


    /**
     * Get multiple rows from the database.
     * @param sql The SQL query.
     * @param params The query parameters.
     * @returns The rows.
     */
    public static all<T = any>(sql: ISqlite.SqlType, ...params: any[]): Promise<T[]> {
        if (!this.db) throw new Error('No database connection');
        return this.db.all(sql, ...params);
    }
}
