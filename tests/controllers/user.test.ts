import { User } from '../../src/controllers/user';
import { UserService as Users } from '../../src/services/database/user';
import { DatabaseService as Database } from '../../src/services/database/database';
import { TEST_DB_PATH } from '../services/database/database.test';

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

describe('Users Module functions', () => {
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

    test('New', async () => {
        const user = await User.new(123456789);
        expect(user).toEqual({ id: 123456789, level: 0, xp: 0 });
    });

    test('Get', async () => {
        const user = await User.get(1);
        expect(user).toEqual({ id: 1, level: 10, xp: 5000 });
    });

    test('Sync', async () => {
        const user = await User.get(1);
        user.level = 20;
        user.xp = 100000;
        await user.sync();

        const savedUser = await Users.get(1);
        expect(savedUser).toEqual({ id: 1, level: 20, xp: 100000 });
    });
});
