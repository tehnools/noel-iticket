import { IsNumber, IsOptional } from 'class-validator';
import { TicketTypeAge } from '../entities/ticketType.entity';

export class Ticket {
  @IsNumber()
  ticketTypeId: number;

  @IsNumber()
  cartId: number;

  @IsNumber()
  allocationId: number;

  @IsNumber()
  price: number;

  type: TicketTypeAge;
}
