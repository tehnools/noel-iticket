import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { error } from 'console';
import { DatabaseDao } from 'src/database/database.dao';
import { EventEntity } from 'src/event/entities/event.entity';
import { CreateCartDto } from './dto/cart-create.dto';
import { CartResponseEntity } from './entities/cart.response.entity';

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
    console.info('Getting event by id', eventId);
    // const event = await this.databaseDao.getById<EventEntity>('event', eventId);

    // if (!event) {
    //   console.error('Event does not exist');
    //   throw new HttpException('Invalid cart', HttpStatus.BAD_REQUEST);
    // }

    // if (tickets.length > event.bookingLimit) {
    //   throw new HttpException(
    //     'Invalid cart pass booking limit',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    if (tickets.length === 0) {
      throw new HttpException('Invalid cart', HttpStatus.BAD_REQUEST);
    }

    const query = `INSERT  INTO ticket (cart_id, allocation_id, ticket_type_id) 
    VALUES ${tickets
      .map(() => '(?,?,?)')
      .join(',')
      .toString()};
    `;

    console.info('Creating cart');
    const cartId = await this.databaseDao.insert('cart', { cart_total: 0 });
    console.info('Created Cart', cartId);

    if (tickets.length > 0) {
      const flattenTickets = tickets.map((ticket) => [
        cartId,
        ticket.allocationId,
        ticket.ticketTypeId,
      ]);
      console.info('Adding Tickets to cartId', cartId);

      const conn = this.databaseDao.createDatabase();
      await new Promise((_, rej) => {
        conn.serialize(() => {
          for (const ticket of flattenTickets) {
            conn.run(query, ticket, function (err) {
              if (err) {
                rej(err);
              }
              console.info('Ticket added', cartId);
            });
          }
        });
      });
      conn.close();
    }

    return this.findOne(cartId);
  }

  updateCart(id: number, updateCartDto: CreateCartDto) {
    const query = `UDPATE ticket SET cartId = ?, `;
    return;
  }

  async findOne(id: number): Promise<CartResponseEntity> {
    const query = `
    `;

    const conn = this.databaseDao.createDatabase();
    return new Promise((res, rej) => {
      conn
        .run(query, id, (err, rows) => {
          if (error) {
            rej(err);
          } else res(rows[0] as CartResponseEntity);
        })
        .close();
    });
  }

  remove(id: number) {
    return this.databaseDao.delete('cart', id);
  }
}
