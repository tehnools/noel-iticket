import { TicketType } from 'src/ticket/dto/ticketType.dto';

export const discount = (tickets: TicketType[]) => {
  // assuming max tickets cannot go greater than 15
  let discount = 1.0;
  let numAdults = 0;
  let numChildren = 0;
  let total = 0;

  for (const ticket of tickets) {
    if (ticket.type === 'Adult') {
      total += ticket.price;
      numAdults += 1;
    } else {
      total += ticket.price;
      numChildren += 1;
    }
  }

  if (numChildren === 0) {
    if (numAdults < 4) {
      return total;
    }
    return total;
  } else if (numChildren === 1) return total;
  else {
  }

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
