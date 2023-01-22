import { IsNumber, IsString } from 'class-validator';

export type TicketType = 'Adult' | 'Child';

export class Ticket {
  @IsNumber()
  id: number;

  @IsNumber()
  eventId: number;

  @IsNumber()
  price: number;

  @IsString()
  type: TicketType;
}
