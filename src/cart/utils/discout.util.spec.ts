import { TicketType } from 'src/ticket/dto/ticketType.dto';
import { discount } from './discount.util';

describe('discount', () => {
  it(`Given the amount and number of adults is > 4,
   it should return the right amount withdiscount`, () => {
    const tickets: TicketType[] = [
      { id: 1, price: 25, type: 'Adult' },
      { id: 1, price: 25, type: 'Adult' },
      { id: 1, price: 25, type: 'Adult' },
      { id: 1, price: 25, type: 'Adult' },
    ];
    const total = discount(tickets);
    expect(total).toBe(90);
  });

  it(`Given the amount and number of adults is > 2 and children is >= 3,
   it should return the right amount with discount`, () => {});
});
