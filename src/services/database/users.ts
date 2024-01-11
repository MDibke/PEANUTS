import { User } from '../../models/user';
import { Database } from './database';

type UserDBModel = {
    id: number;
    level: number;
    xp: number;
};

export class Users {

    constructor() {}

    /**
     * Get a user by id.
     * @param id The user id.
     * @returns The user or undefined if not found.
     */
    public static async get(id: number): Promise<UserDBModel | undefined> {
        return Database.get<User>('SELECT * FROM users WHERE id = ?', id);
    }


    /**
     * Get all users from the database.
     * @returns All users.
     */
    public static async getAll(): Promise<UserDBModel[]> {
        return Database.all<User>('SELECT * FROM users');
    }


    /**
     * Add a user to the database.
     * @param id The user id.
     * @returns True if the user was added, false if the user already exists.
     */
    public static async add(id: number, level: number, xp: number): Promise<boolean> {
        if (await this.get(id)) return false;
        await Database.exec(
            `INSERT INTO users (id, level, xp) VALUES (?, ?, ?)`, [ id, level, xp ]
        );
        return true;
    }


    /**
     * Delete a user from the database.
     * @param id The user id.
     * @returns True if the user was deleted, false if the user was not found.
     */
    public static async delete(id: number): Promise<boolean> {
        const result = await Database.exec('DELETE FROM users WHERE id = ?', id);
        return !!result.changes;
    }


    /**
     * Update a user's values in the database.
     * @param id The user id.
     * @param level The user's level.
     * @param xp The user's xp.
     * @returns True if the user was updated, false if the user was not found.
     */
    public static async update(id: number, level: number, xp: number): Promise<boolean> {
        const result = await Database.exec('UPDATE users SET level = ?, xp = ? WHERE id = ?', [ level, xp, id ]);
        return !!result.changes;
    }
}
