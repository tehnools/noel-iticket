import { IsNumber } from 'class-validator';

export class Ticket {
  @IsNumber()
  ticketTypeId: number;

  @IsNumber()
  cartId: number;

  @IsNumber()
  allocationId: number;
}
