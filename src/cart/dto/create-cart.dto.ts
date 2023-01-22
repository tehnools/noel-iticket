import { CartEntity } from '../entities/cart.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

export class CreateCartDto implements CartEntity {
  tickets: Ticket[];
}
