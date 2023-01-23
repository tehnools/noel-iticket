import { IsNumber, IsString } from 'class-validator';
import { TicketTypeAge } from '../entities/ticketType.entity';

export class TicketType {
  @IsNumber()
  id: number;

  @IsNumber()
  price: number;

  @IsString()
  type: TicketTypeAge;

  @IsNumber()
  eventId: number;
}
