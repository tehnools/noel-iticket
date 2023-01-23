import { IsNumber } from 'class-validator';
import { TicketType } from './ticketType.dto';

export class Ticket {
  @IsNumber()
  id: number;

  @IsNumber()
  seatId: number;

  @IsNumber()
  cartId: number;

  ticketType: TicketType;
}
