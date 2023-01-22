import { IsNumber } from 'class-validator';
import { TicketType } from 'src/ticket/dto/ticketType.dto';
import { CartEntity } from '../entities/cart.entity';

export class CreateCartDto {
  @IsNumber()
  id: number;

  @IsNumber()
  eventId: number;

  tickets: TicketType[];
}
