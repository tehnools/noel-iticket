import { TicketEntity } from 'src/ticket/entities/ticket.entity';

export interface CartResponseEntity {
  id: number;
  total: number;
  tickets: TicketEntity[];
}
