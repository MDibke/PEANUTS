import fs from 'node:fs';
import sqlite, { open, ISqlite, Statement } from 'sqlite';
import sqlite3 from 'sqlite3';

sqlite3.verbose();

export class Database {
    private static DB_PATH = process.cwd() + '/database/database.db';
    private static INIT_FILE = process.cwd() + '/database/init.sql';

    private static db: sqlite.Database;

    constructor() {}

    public static async open(filepath?: string): Promise<sqlite.Database> {
        this.db = await open({
            filename: filepath || this.DB_PATH,
            driver: sqlite3.Database,
        });
        return this.db;
    }

    public static async init(params?: { initFilePath?: string } | { query?: string; }): Promise<void> {
        let sql = '';
        if (params['query']) sql = params['query'];
        else sql = fs.readFileSync(params['initFilePath'] || this.INIT_FILE, 'utf8');

        try {
            await this.clear();
            await this.db.exec(sql);
        } catch (error) {
            console.error('Error initializing database:', error.message);
        }
    }

    /**
     * Clear the database by dropping all tables and recreating them.
     */
    public static async clear(): Promise<void> {
        const tableNames = await this.getTableNames();
        const sql = tableNames.map(table => `DROP TABLE ${table};`).join('\n');

        try {
            await this.db.exec(sql);
        } catch (error) {
            console.error('Error clearing database:', error.message);
        }
    }

    public static async getTableNames(): Promise<string[]> {
        const result = await this.db.all("SELECT name FROM sqlite_master WHERE type='table'");
        return result.map(row => row.name);
    }

    public static exec(sql: ISqlite.SqlType): Promise<void> {
        if (!this.db) throw new Error('No database connection');
        return this.db.exec(sql);
    }

    public static get<T = any>(sql: ISqlite.SqlType, ...params: any[]): Promise<T | undefined> {
        if (!this.db) throw new Error('No database connection');
        return this.db.get(sql, ...params);
    }

    public static all<T = any>(sql: ISqlite.SqlType, ...params: any[]): Promise<T[]> {
        if (!this.db) throw new Error('No database connection');
        return this.db.all(sql, ...params);
    }

    public static run(sql: ISqlite.SqlType, ...params: any[]): Promise<ISqlite.RunResult> {
        if (!this.db) throw new Error('No database connection');
        return this.db.run(sql, ...params);
    }
}
