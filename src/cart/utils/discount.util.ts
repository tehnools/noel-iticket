import { Ticket } from 'src/ticket/dto/ticket.dto';
import { TicketType } from 'src/ticket/dto/ticketType.dto';

export const discount = (tickets: TicketType[]) => {
  let discount = 1.0;
  let numAdults = 0;
  let numChildren = 0;
  let total = 0;
  for (const ticket of tickets) {
    total += ticket.price;
    if (ticket.type === 'Adult') {
      numAdults += 1;
    } else {
      numChildren += 1;
    }
  }
  const modAdults = numAdults % 2;
  const modChildrenToAdults = numChildren % numAdults;
  if (numChildren === 0) {
    if (numAdults >= 4) {
      discount = 0.9;
    }
  } else {
    if (modAdults === 0) {
    }
  }
  console.log(
    'numAdults',
    numAdults,
    numChildren,
    'modAdults',
    modAdults,
    'modChildrenToAdults',
    modChildrenToAdults,
    'discount',
    discount,
  );

  return total * discount;
};
