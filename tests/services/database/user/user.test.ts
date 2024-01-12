import { DatabaseService as Database } from '../../../../src/services/database/database';
import { UserService as Users } from '../../../../src/services/database/user';
import { TEST_DB_PATH } from '../database.test';

export const DB_INIT = `
    DROP TABLE IF EXISTS 'users';
    CREATE TABLE IF NOT EXISTS 'users' (
        'id' int(11) NOT NULL PRIMARY KEY,
        'level' int(11) NOT NULL,
        'xp' int(11) NOT NULL
    );
    INSERT INTO 'users' ('id', 'level', 'xp') VALUES (1, 10, 5000);
    INSERT INTO 'users' ('id', 'level', 'xp') VALUES (2, 1, 10);
`;

describe('Users Service functions', () => {
    beforeAll(async () => {
        await Database.open(TEST_DB_PATH);
    });

    beforeEach(async () => {
        await Database.init({ query: DB_INIT });
    });

    afterEach(async () => {});

    afterAll(async () => {
        await Database.close();
    });

    /* -------------------------------------------------------------------------- */

    test('Get', async () => {
        const user = await Users.get(1);

        expect(user).toEqual({ id: 1, level: 10, xp: 5000 });
    });

    test('Get All', async () => {
        const users = await Users.getAll();

        expect(users).toContainEqual({ id: 1, level: 10, xp: 5000 });
        expect(users).toContainEqual({ id: 2, level: 1, xp: 10 });
    });

    test('Add', async () => {
        await Users.add(123456789, 5, 2000);

        const user = await Database.get('SELECT * FROM users where id = ?', 123456789);
        expect(user).toEqual({ id: 123456789, level: 5, xp: 2000 });

        // Check that the user cannot be added again
        const success = await Users.add(123456789, 0, 0);
        expect(success).toBe(false);
    });

    test('Delete', async () => {
        await Users.delete(1);
        const user = await Users.get(1);
        expect(user).toBeUndefined();

        // Check that the user cannot be deleted again
        const success = await Users.delete(1);
        expect(success).toBe(false);
    });

    test('Update', async () => {
        await Users.update(1, 20, 100000);
        const user = await Users.get(1);
        expect(user).toEqual({ id: 1, level: 20, xp: 100000 });
    });
});
