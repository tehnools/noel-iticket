import { Ticket } from 'src/ticket/dto/ticket-create.dto';
import { discount, calculateRemainder } from './discount.util';
describe('calculateRemainder', () => {
  it('should be able to calculate if empty', () => {
    const tickets: Ticket[] = [];
    const result = calculateRemainder(tickets);
    expect(result).toBe(0);
  });

  it('should be able to cacluate if null', () => {
    const tickets: Ticket[] = [{ id: 1, price: 25, type: 'Adult' } as Ticket];
    const result = calculateRemainder(tickets);
    expect(result).toBe(25);
  });

  it('should be able to calculate multiple', () => {
    const tickets: Ticket[] = [
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
    ];
    const result = calculateRemainder(tickets);
    expect(result).toBe(30);
  });
});

describe('discount', () => {
  it(`Given the there are no tickets,
   it should return 0`, () => {
    const tickets: Ticket[] = [];
    const total = discount(tickets);
    expect(total).toBe(0);
  });

  it(`Given the there is one adult,
  it should return 25`, () => {
    const tickets: Ticket[] = [{ id: 1, price: 25, type: 'Adult' } as Ticket];
    const total = discount(tickets);
    expect(total).toBe(25);
  });

  it(`Given the amount and number of adults is < 4,
   it should have no discount`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 2, price: 25, type: 'Adult' } as Ticket,
      { id: 3, price: 25, type: 'Adult' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toBe(75);
  });

  it(`Given the there is one child,
  it should return 15`, () => {
    const tickets: Ticket[] = [{ id: 1, price: 15, type: 'Child' } as Ticket];
    const total = discount(tickets);
    expect(total).toBe(15);
  });

  it(`Given the there is two children,
  it should return 30`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 2, price: 15, type: 'Child' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toBe(30);
  });

  it(`Given the there is three children,
  it should return 45`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 2, price: 15, type: 'Child' } as Ticket,
      { id: 3, price: 15, type: 'Child' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toBe(45);
  });

  it(`Given the amount and number of adults is 4,
   it should return the right amount with discount of 10%`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 2, price: 25, type: 'Adult' } as Ticket,
      { id: 3, price: 25, type: 'Adult' } as Ticket,
      { id: 4, price: 25, type: 'Adult' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toBe(90);
  });

  it(`Given the amount and number of adults is 5,
  it should return the right amount with discount of 10%`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toEqual(112.5);
  });

  it(`Given the amount and number of adults is  2 and children is  2,
   it should return the right amount is 70`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toEqual(70);
  });

  it(`Given the amount and number of adults is > 2 and children is  3,
  it should return the right amount is 70`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toEqual(70);
  });

  it(`Given the amount and number of adults is 4 and children is 4,
   it should return the right amount is 140`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 2, price: 25, type: 'Adult' } as Ticket,
      { id: 3, price: 25, type: 'Adult' } as Ticket,
      { id: 4, price: 25, type: 'Adult' } as Ticket,
      { id: 5, price: 15, type: 'Child' } as Ticket,
      { id: 6, price: 15, type: 'Child' } as Ticket,
      { id: 7, price: 15, type: 'Child' } as Ticket,
      { id: 8, price: 15, type: 'Child' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toEqual(140);
  });

  it(`Given the amount and number of adults is 4 and children is 5,
  it should return the right amount is 155`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toEqual(155);
  });

  it(`Given the amount and number of adults is 4 and children is 6,
   it should return the right amount is 140`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toEqual(140);
  });

  it(`Given the amount and number of adults is 3 and children is 1,
  it should return the right amount is 90`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 25, type: 'Adult' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toEqual(90);
  });

  it(`Given the amount and number of adults is 1 and children is 3,
  it should return the right amount is 70`, () => {
    const tickets: Ticket[] = [
      { id: 1, price: 25, type: 'Adult' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
      { id: 1, price: 15, type: 'Child' } as Ticket,
    ];
    const total = discount(tickets);
    expect(total).toEqual(70);
  });
});
