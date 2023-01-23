import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { TicketType } from 'src/ticket/dto/ticketType.dto';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @IsNumber()
  eventId: number;

  @IsNumber({}, { each: true })
  seats: number[];

  tickets: TicketType[];
}
