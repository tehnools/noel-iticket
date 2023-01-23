import { TicketTypeEntity } from 'src/ticket/entities/ticketType.entity';

export interface CartResponseEntity {
  id: number;
  total: number;
  seats: number[];
  ticketTypes: TicketTypeEntity[];
}
