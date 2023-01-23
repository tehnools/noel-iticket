import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseDao } from 'src/database/database.dao';

@Module({
  controllers: [CartController],
  providers: [CartService, DatabaseDao],
})
export class CartModule {}
