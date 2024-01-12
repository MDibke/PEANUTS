import { UserService } from '../services/database/user';

export class User {
    public id: number;
    public level: number;
    public xp: number;

    constructor(id: number, level: number, xp: number) {
        this.id = id;
        this.level = level;
        this.xp = xp;
    }


    /**
     * Update the user's values in the database.
     * @throws Error if the user does not exist yet.
     */
    public async sync(): Promise<void> {
        const exists = await UserService.update(this.id, this.level, this.xp);
        if (!exists) throw new Error('User does not exist yet');
    }


    /* -------------------------------------------------------------------------- */
    /*                               STATIC METHODS                               */
    /* -------------------------------------------------------------------------- */

    /**
     * Create a new user and add it to the database.
     * @param id The user id.
     * @returns The new user.
     */
    public static async new(id: number): Promise<User> {
        await UserService.add(id, 0, 0);
        const user = new User(id, 0, 0);
        return user;
    }
    /**
     * Retrieve a user from the database.
     * @param id The user id.
     * @returns The user or undefined if not found.
     */
    public static async get(id: number): Promise<User | undefined> {
        const user = await UserService.get(id);
        if (!user) return undefined;
        return new User(user.id, user.level, user.xp);
    }
}
