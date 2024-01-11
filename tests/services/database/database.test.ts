import { Database } from '../../../src/services/database/database';

export const TEST_DB_PATH = process.cwd() + '/tests/database/database.test.db';

export const DB_INIT = `
    CREATE TABLE IF NOT EXISTS 'users' (
        'id' int(11) NOT NULL,
        'name' varchar(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS 'animals' (
        'id' int(11) NOT NULL,
        'name' varchar(255) NOT NULL,
        'weight' int(11) NOT NULL
    );

    INSERT INTO 'users' ('id', 'name') VALUES (1, 'John Doe');
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
        const user = await Database.get('SELECT name FROM users WHERE id = ?', 1);

        expect(user).toEqual({ name: 'John Doe' });
    });

    test('Get table names', async () => {
        const tableNames = await Database.getTableNames();

        expect(tableNames).toContain('users');
        expect(tableNames).toContain('animals');
    });

    test('Clear', async () => {
        await Database.clear();

        const tableNames = await Database.getTableNames();

        expect(tableNames).toHaveLength(0);
    });
});
