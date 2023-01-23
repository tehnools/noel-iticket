import { IsNumber, IsOptional } from 'class-validator';
import { Ticket } from 'src/ticket/dto/ticket-create.dto';

export class CreateCartDto {
  @IsNumber()
  @IsOptional()
  eventId: number;

  tickets: Ticket[];
}
