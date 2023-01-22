import { TicketType } from 'src/ticket/dto/ticketType.dto';

export const calculateRemainder = (tickets: TicketType[]) => {
  if (tickets.length !== 0) {
    return tickets
      .map((ticket) => ticket.price)
      .reduce((total, price) => total + price);
  }
  return 0;
};

export const discount = (tickets: TicketType[]) => {
  // assuming max tickets cannot go greater than 15
  const adultDiscount = 0.9;
  let total = 0;
  let adults = tickets.filter((ticket) => ticket.type === 'Adult');
  let children = tickets.filter((ticket) => ticket.type === 'Child');
  const numberOfAdults = adults.length;
  const numberOfChildren = children.length;

  while (adults.length !== 0 || children.length !== 0) {
    if (numberOfChildren === 0) {
      if (numberOfAdults >= 4) {
        total += calculateRemainder(adults) * adultDiscount;
      } else {
        total += calculateRemainder(adults);
      }
      adults = adults.slice(adults.length);
    } else if (numberOfAdults === 0) {
      total += calculateRemainder(children);
      children = children.slice(children.length);
    } else {
      if (adults.length % 2 === 0) {
        if (children.length % 3 === 0) {
          children = children.slice(3);
          adults = adults.slice(2);
          total += 70;
        } else if (children.length % 2 === 0) {
          children = children.slice(2);
          adults = adults.slice(2);
          total += 70;
        } else {
          total += children.pop().price;
        }
      } else {
        const remainder = [...adults, ...children];
        total += calculateRemainder(remainder);
        break;
      }
    }
  }
  return total;
};
