import { IsNumber } from 'class-validator';
import { CartEntity } from '../entities/cart.entity';

export class CreateCartDto implements CartEntity {
  @IsNumber()
  id: number;

  @IsNumber()
  total: number;
}
