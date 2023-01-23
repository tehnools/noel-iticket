import { Injectable } from '@nestjs/common';
import { DatabaseDao } from 'src/database/database.dao';
import { EventEntity } from 'src/event/entities/event.entity';
import { CartDto, CreateCartDto } from './dto/cart-create.dto';
import { CartResponseEntity } from './entities/cart.response.entity';
import { discount } from './utils/discount.util';

@Injectable()
export class CartService {
  databaseDao: DatabaseDao;

  constructor(databaseDao: DatabaseDao) {
    this.databaseDao = databaseDao;
  }

  async createCart({
    eventId,
    tickets,
  }: CreateCartDto): Promise<CartResponseEntity> {
    // this.databaseDao.db.all([]);
    const cartId = await this.databaseDao.insert('cart', { total: 0 });
    const event = await this.databaseDao.getById<EventEntity>('event', eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    if (tickets.length > event.bookingLimit) {
      throw new Error('Past booking limit');
    }

    const query = `INSERT  INTO ticket (cart_id, allocation_id, ticket_type_id) 
      VALUES ${tickets.map((result) => result + ',(?,?,?)')};
    `;

    if (tickets.length > 0) {
      const flattenTickets = tickets.map((ticket) => [
        ticket.cartId,
        ticket.allocationId,
        ticket.ticketTypeId,
      ]);
      this.databaseDao.db.serialize(() => {
        this.databaseDao.db.run(query, [...flattenTickets], function (err) {
          if (err) throw err;
        });
      });
    }

    return this.findOne(cartId);
  }

  updateCart(id: number, updateCartDto: CreateCartDto) {
    const query = `UDPATE ticket SET cartId = ?, `;
    return;
  }

  async findOne(id: number): Promise<CartResponseEntity> {
    const query = `SELECT cart AS c, ticket AS t FROM A 
    LEFT JOIN T ON C.id = T.cartId WHERE cartId = 1
    `;

    return this.databaseDao.getById<CartResponseEntity>('cart', id);
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
