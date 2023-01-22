import { TicketType } from 'src/ticket/dto/ticketType.dto';
import { discount } from './discount.util';

describe('discount', () => {
  it(`Given the there are no tickets,
   it should return 0`, () => {
    const tickets: TicketType[] = [];
    const total = discount(tickets);
    expect(total).toBe(0);
  });

  it(`Given the there is one adult,
  it should return 25`, () => {
    const tickets: TicketType[] = [{ id: 1, price: 25, type: 'Adult' }];
    const total = discount(tickets);
    expect(total).toBe(25);
  });

  it(`Given the amount and number of adults is < 4,
   it should have no discount`, () => {
    const tickets: TicketType[] = [
      { id: 1, price: 25, type: 'Adult' },
      { id: 1, price: 25, type: 'Adult' },
      { id: 1, price: 25, type: 'Adult' },
    ];
    const total = discount(tickets);
    expect(total).toBe(75);
  });

  it(`Given the there is one child,
  it should return 15`, () => {
    const tickets: TicketType[] = [{ id: 1, price: 25, type: 'Child' }];
    const total = discount(tickets);
    expect(total).toBe(15);
  });

  // it(`Given the there is two children,
  // it should return 15`, () => {
  //   const tickets: TicketType[] = [{ id: 1, price: 25, type: 'Child' }];
  //   const total = discount(tickets);
  //   expect(total).toBe(30);
  // });

  // it(`Given the amount and number of adults is 4,
  //  it should return the right amount with discount of 10%`, () => {
  //   const tickets: TicketType[] = [
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //   ];
  //   const total = discount(tickets);
  //   expect(total).toBe(90);
  // });

  // it(`Given the amount and number of adults is 5,
  // it should return the right amount with discount of 10%`, () => {
  //   const tickets: TicketType[] = [
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //   ];
  //   const total = discount(tickets);
  //   expect(total).toEqual(112.5);
  // });

  // it(`Given the amount and number of adults is  2 and children is  2,
  //  it should return the right amount is 70`, () => {
  //   const tickets: TicketType[] = [
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //   ];
  //   const total = discount(tickets);
  //   expect(total).toEqual(70);
  // });

  // it(`Given the amount and number of adults is > 2 and children is  3,
  // it should return the right amount is 70`, () => {
  //   const tickets: TicketType[] = [
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //   ];
  //   const total = discount(tickets);
  //   expect(total).toEqual(70);
  // });

  // it(`Given the amount and number of adults is 4 and children is 4,
  //  it should return the right amount is 140`, () => {
  //   const tickets: TicketType[] = [
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //   ];
  //   const total = discount(tickets);
  //   expect(total).toEqual(70);
  // });

  // it(`Given the amount and number of adults is 4 and children is 5,
  // it should return the right amount is 140`, () => {
  //   const tickets: TicketType[] = [
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //   ];
  //   const total = discount(tickets);
  //   expect(total).toEqual(70);
  // });

  // it(`Given the amount and number of adults is 4 and children is 6,
  //  it should return the right amount is 140`, () => {
  //   const tickets: TicketType[] = [
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 25, type: 'Adult' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //     { id: 1, price: 15, type: 'Child' },
  //   ];
  //   const total = discount(tickets);
  //   expect(total).toEqual(70);
  // });
});
