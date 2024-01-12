import { DatabaseService as Database } from '../../../src/services/database/database';

export const TEST_DB_PATH = process.cwd() + '/tests/database/database.test.db';

export const DB_INIT = `
    DROP TABLE IF EXISTS 'users';
    CREATE TABLE IF NOT EXISTS 'users' (
        'id' int(11) NOT NULL PRIMARY KEY,
        'level' int(11) NOT NULL,
        'xp' int(11) NOT NULL
    );
    INSERT INTO 'users' ('id', 'level', 'xp') VALUES (1, 10, 5000);
`;

describe('Database function', () => {
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

    test('Init', async () => {
        const user = await Database.get('SELECT * FROM users WHERE id = ?', 1);

        expect(user).toEqual({ id: 1, level: 10, xp: 5000 });
    });
});
