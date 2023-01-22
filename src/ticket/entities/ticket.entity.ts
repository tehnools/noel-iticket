import { TicketTypeEntity } from './ticketType.entity';

export class TicketEntity {
  id: number;
  seat: number;
  cartId: number;
  eventType: TicketTypeEntity;
}
