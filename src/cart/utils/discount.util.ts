import e from 'express';
import { TicketType } from 'src/ticket/dto/ticketType.dto';

export const discount = (tickets: TicketType[]) => {
  // assuming max tickets cannot go greater than 15
  const adultDiscount = 0.9;
  let total = 0;
  const adults = tickets.filter((ticket) => ticket.type === 'Adult');
  const children = tickets.filter((ticket) => ticket.type === 'Child');

  while (adults.length !== 0 || children.length !== 0) {
    if (adults.length === 1) {
      total += adults.pop().price;
      console.log('total');
      break;
    }
    if (children.length === 1) {
      total += children.pop().price;
      break;
    }

    console.log(
      'asdasddfa0',
      children,
      adults,
      'child-mod-3',
      children.length % 3,
      'child-mod-2',
      children.length % 2,
      'adult-mod-2',
      adults.length % 2,
    );

    if (children.length === 0) {
      if (adults.length >= 4) {
        const remainingAdultPrices = adults
          .map((ticket) => {
            // pop adult off list
            adults.pop();
            return ticket.price;
          })
          .reduce((total, price) => total + price);
        total += remainingAdultPrices * adultDiscount;
      } else {
        const remainingAdultPrices = adults
          .map((ticket) => ticket.price)
          .reduce((total, price) => total + price);
        total += remainingAdultPrices;
        break;
      }
    } else if (adults.length === 0) {
      const remaininChildPrices = children
        .map((ticket) => ticket.price)
        .reduce((total, price) => total + price);
      total += remaininChildPrices;
      break;
    } else {
      if (adults.length % 2 === 0) {
        if (children.length % 3 === 0) {
          children.pop();
          children.pop();
          children.pop();
          adults.pop();
          adults.pop();
          total += 70;
        } else if (children.length % 2 === 0) {
          children.pop();
          children.pop();
          adults.pop();
          adults.pop();
          total += 70;
        } else {
          total += children.pop().price;
        }
      } else {
        total += adults.pop().price;
      }
    }
  }
  return total;
};
