import { Ticket } from 'src/ticket/dto/ticket-create.dto';

export const calculateRemainder = (tickets: Ticket[]) => {
  if (tickets.length !== 0) {
    return tickets
      .map((ticket) => ticket.price)
      .reduce((total, price) => total + price);
  }
  return 0;
};

export const discount = (tickets: Ticket[]) => {
  const ADULT_DISCOUNT = 0.9;
  const FAMILY_DISCOUNT = 70;
  let total = 0;
  let children = tickets.filter((t) => t.type === 'Child');
  let adults = tickets.filter((t) => t.type === 'Adult');

  if (tickets.length === 0) {
    return total;
  }

  // 0(1)
  for (let i = 0; i <= tickets.length; i++) {
    if (children.length === 0 && adults.length === 0) {
      return total;
    }
    if (children.length === 0) {
      let result = calculateRemainder(adults);
      if (adults.length >= 4) {
        result *= ADULT_DISCOUNT;
      }
      total += result;
      adults = adults.slice(adults.length);
      return total;
    }

    if (adults.length === 0) {
      total += calculateRemainder(children);
      children = children.slice(children.length);
      return total;
    }

    const adultsMultipleOf2 = adults.length % 2 === 0;
    const childrenMultipleOf2 = children.length % 2 === 0;
    const childrenMultipleOf3 = children.length % 3 === 0;
    console.log(
      adults,
      children,
      adultsMultipleOf2,
      childrenMultipleOf2,
      childrenMultipleOf3,
    );

    if (adultsMultipleOf2 && childrenMultipleOf3) {
      adults.splice(0, 2);
      children.splice(0, 3);
      total += FAMILY_DISCOUNT;
      continue;
    }

    if (adultsMultipleOf2 && childrenMultipleOf2) {
      adults.splice(0, 2);
      children.splice(0, 2);
      total += FAMILY_DISCOUNT;
      continue;
    }

    console.log('2', adults, children);
    if (children.length > adults.length) {
      total += children.pop().price;
      continue;
    }

    console.log('3', adults, children);
    if (adults.length > children.length) {
      total += adults.pop().price;
      continue;
    }
    // total += calculateRemainder([...children, ...adults]);
    // adults = adults.slice(adults.length);
    // children = children.slice(children.length);
  }
};
