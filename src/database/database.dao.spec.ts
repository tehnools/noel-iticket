import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseDao } from './database.dao';

describe('DatabaseDao', () => {
  let service: DatabaseDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseDao],
    }).compile();

    service = module.get<DatabaseDao>(DatabaseDao);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
