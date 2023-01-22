import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseDao } from './database.dao';

describe('DatabaseDao', () => {
  let databaseDao: DatabaseDao;
  const TABLE_NAME = 'test_table';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseDao],
    }).compile();

    databaseDao = module.get<DatabaseDao>(DatabaseDao);
  });

  beforeEach(async () => {
    databaseDao.db.exec(`
  create table IF NOT EXISTS ${TABLE_NAME} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_name TEXT NOT null
  );
  `);
  });

  afterEach(async () => {
    databaseDao.db.exec(`
    DROP TABLE IF EXISTS ${TABLE_NAME};
    `);
  });

  it('should be defined', () => {
    expect(databaseDao).toBeDefined();
  });

  describe('insert', () => {
    it('should be able to insert and rows', async () => {
      const values = { test_name: 'test' };
      const id = await databaseDao.insert(TABLE_NAME, values);

      expect(id).toBe(1);
    });
  });

  describe('update', () => {
    it('should be able to update by id', async () => {
      const values = { id: 1, test_name: 'test' };
      await databaseDao.insert(TABLE_NAME, values);
      await databaseDao.update(TABLE_NAME, values, 'WHERE id = ?');
      const result = await databaseDao.getById<{
        id: number;
        test_name: string;
      }>(TABLE_NAME, 1);

      expect(result).toEqual({ id: 1, test_name: 'test' });
    });
  });
});
