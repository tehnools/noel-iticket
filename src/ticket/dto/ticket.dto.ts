import { IsNumber } from 'class-validator';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketType } from './ticketType.dto';

export class Ticket implements TicketEntity {
  @IsNumber()
  id: number;

  @IsNumber()
  seatId: number;

  @IsNumber()
  cartId: number;

  ticketType: TicketType;
}
