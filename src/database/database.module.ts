import { Module } from '@nestjs/common';
import { DatabaseDao } from './database.dao';

@Module({
  providers: [DatabaseDao],
})
export class DatabaseModule {}
