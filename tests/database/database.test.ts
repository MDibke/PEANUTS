import { Database } from '../../src/services/database';

const TEST_DB_PATH = process.cwd() + '/tests/database/database.test.db';

describe('Database function', () => {
    beforeAll(() => {
        // Setup code, if necessary
    });

    afterAll(async () => {
        // Clear database
        await Database.clear();
    });

    test('Open', async () => {
        const db = await Database.open(TEST_DB_PATH);

        expect(db).toBeDefined();
    });

    test('Init', async () => {
        await Database.open(TEST_DB_PATH);
        await Database.init({ initFilePath: './tests/database/init.sql' });

        const user = await Database.get('SELECT name FROM users WHERE id = ?', 1);

        expect(user).toEqual({ name: 'John Doe' });
    });

    test('Get table names', async () => {
        await Database.open(TEST_DB_PATH);
        await Database.init({ initFilePath: './tests/database/init.sql' });

        const tableNames = await Database.getTableNames();

        expect(tableNames).toContain('users');
        expect(tableNames).toContain('animals');
    });

    test('Clear', async () => {
        await Database.open(TEST_DB_PATH);
        await Database.init({ initFilePath: './tests/database/init.sql' });
        await Database.clear();

        const tableNames = await Database.getTableNames();

        expect(tableNames).toHaveLength(0);
    });
});
