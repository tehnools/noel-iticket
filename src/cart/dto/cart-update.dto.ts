import { IsNumber } from 'class-validator';
import { Ticket } from 'src/ticket/dto/ticket-create.dto';

export class UpdateCartDto {
  @IsNumber()
  cartId: number;

  @IsNumber()
  eventId: number;
  tickets: Ticket[];
}
