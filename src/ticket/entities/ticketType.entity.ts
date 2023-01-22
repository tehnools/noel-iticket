export type TicketTypeAge = 'Adult' | 'Child';

export class TicketTypeEntity {
  id: number;
  eventId: number;
  price: number;
  type: TicketTypeAge;
}
