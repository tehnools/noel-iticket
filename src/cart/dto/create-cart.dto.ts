import { IsNumber, IsOptional } from 'class-validator';
import { TicketType } from 'src/ticket/dto/ticketType.dto';

export class CreateCartDto {
  @IsNumber()
  @IsOptional()
  eventId: number;

  @IsNumber({}, { each: true })
  seats: number[];

  tickets: TicketType[];
}
