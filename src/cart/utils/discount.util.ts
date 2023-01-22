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

    if (children.length === 0) {
      if (adults.length >= 4) {
        const remainingAdultPrices = adults
          .map((ticket) => ticket.price)
          .reduce((total, price) => total + price);
        total += remainingAdultPrices * adultDiscount;
        break;
      } else {
        total += adults.pop().price;
      }
    } else {
      if (3 % children.length === 0 && 2 % adults.length === 0) {
        children.pop();
        children.pop();
        children.pop();
        adults.pop();
        adults.pop();
        total += 70;
      } else if (2 % children.length === 0 && 2 % adults.length === 0) {
        children.pop();
        children.pop();
        adults.pop();
        adults.pop();
        total += 70;
      } else {
        total += children.pop().price;
      }
    }
  }

  //     total += ticket.price;
  //     if (ticket.type === 'Adult') {
  //       numAdults += 1;
  //     } else {
  //       numChildren += 1;
  //     }
  //   }

  //   if (numChildren === 0) {
  //     if (numAdults < 4) {
  //       return total;
  //     }
  //     return total;
  //   } else if (numChildren === 1) return total;
  //   else {
  //   }

  //   const adultsMod2 = numAdults % 2;
  //   const modAdultsToChildren = numAdults % numChildren;
  //   if (numChildren === 0) {
  //     if (numAdults >= 4) {
  //       discount = 0.9;
  //     }
  //   } else {
  //     if (adultsMod2 === 0) {
  //     }
  //   }
  //   console.log(
  //     'numAdults',
  //     numAdults,
  //     numChildren,
  //     'adultsMod2',
  //     adultsMod2,
  //     'modChildrenToAdults',
  //     modAdultsToChildren,
  //     'discount',
  //     discount,
  //   );

  return total;
};
