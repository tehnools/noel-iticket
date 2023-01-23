import { IsNumber, IsOptional } from 'class-validator';
import { Ticket } from 'src/ticket/dto/ticket-create.dto';

export class UpdateCartDto {
  @IsNumber()
  @IsOptional()
  cartId: number;
  tickets: Ticket[];
}
