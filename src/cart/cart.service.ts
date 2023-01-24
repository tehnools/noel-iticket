import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseDao } from 'src/database/database.dao';
import { EventEntity } from 'src/event/entities/event.entity';
import { Ticket } from 'src/ticket/dto/ticket-create.dto';
import { CreateCartDto } from './dto/cart-create.dto';
import { CartResponseEntity } from './entities/cart.response.entity';
import { discount } from './utils/discount.util';

@Injectable()
export class CartService {
  databaseDao: DatabaseDao;

  constructor(databaseDao: DatabaseDao) {
    this.databaseDao = databaseDao;
  }

  async getAll() {
    return this.databaseDao.getAll('cart');
  }

  async deleteTickets(cartId: number): Promise<void> {
    const conn = this.databaseDao.createDatabase();
    console.info('Deleteing tickets from cartId', cartId);
    await new Promise((res, rej) => {
      conn.run(
        `DELETE FROM ticket WHERE cart_id = ?`,
        [cartId],
        function (err) {
          if (err) {
            rej(err);
          }
          console.info('Ticket deleted', cartId);
          res(true);
        },
      );
    });
    conn.close();
  }

  async addTickets(cartId: number, tickets: Ticket[]) {
    console.info('Adding Tickets to cartId', cartId);
    const query = `INSERT  INTO ticket (cart_id, allocation_id, ticket_type_id) 
    VALUES ${tickets
      .map(() => '(?,?,?)')
      .join(',')
      .toString()};
    `;

    console.log('Add ticket query', query);

    const flattenTickets = tickets
      .map((ticket) => [
        Number(cartId),
        ticket.allocationId,
        ticket.ticketTypeId,
      ])
      .flat();

    console.log('adding tickets', flattenTickets);
    const conn = this.databaseDao.createDatabase();
    await new Promise((res, rej) => {
      // conn.serialize(() => {
      //   for (const ticket of flattenTickets) {
      //     conn.run(query, ticket, function (err) {
      //       if (err) {
      //         rej(err);
      //       }
      //       console.info('Ticket added', cartId);
      //       res(true);
      //     });
      //   }
      // });

      conn.run(query, flattenTickets, function (err) {
        if (err) {
          rej(err);
        }
        console.info('Tickets added to cart: ', cartId);
        res(true);
      });
    });
    conn.close();
  }

  async createCart({
    eventId,
    tickets,
  }: CreateCartDto): Promise<CartResponseEntity> {
    console.info('Getting event by id', eventId);
    const event = await this.databaseDao.getById<EventEntity>('event', eventId);

    if (!event) {
      console.error('Event does not exist');
      throw new HttpException('Invalid cart', HttpStatus.BAD_REQUEST);
    }

    if (tickets.length > event.bookingLimit) {
      throw new HttpException(
        'Invalid cart pass booking limit',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (tickets.length === 0) {
      throw new HttpException('Invalid cart', HttpStatus.BAD_REQUEST);
    }

    console.info('Creating cart');
    const cartId = await this.databaseDao.insert('cart', {
      cart_total: discount(tickets),
    });
    console.info('Created Cart', cartId);
    await this.addTickets(cartId, tickets);

    return this.findOne(cartId);
  }

  async updateCart(
    cartId: number,
    { tickets, eventId }: CreateCartDto,
  ): Promise<CartResponseEntity> {
    console.info('Getting event by id', eventId);
    const event = await this.databaseDao.getById<EventEntity>('event', eventId);

    if (!event) {
      console.error('Event does not exist');
      throw new HttpException('Invalid cart', HttpStatus.BAD_REQUEST);
    }

    if (tickets.length > event.bookingLimit) {
      throw new HttpException(
        'Invalid cart pass booking limit',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (tickets.length === 0) {
      throw new HttpException('Invalid cart', HttpStatus.BAD_REQUEST);
    }

    await this.deleteTickets(cartId);
    await this.addTickets(cartId, tickets);
    await this.databaseDao.updateById('cart', cartId, {
      cart_total: discount(tickets),
    });

    return this.findOne(cartId);
  }

  async findOne(id: number): Promise<CartResponseEntity> {
    const query = `
    SELECT  
    c.cart_id,
    c.cart_total,
    json_group_array(
        json_object(
          'id',t.ticket_id,
          'cartId', t.cart_id,
          'allocation', json_object(
                'id',a.allocation_id,
                'value',a.value
              ),
              'ticketType', json_object(
                'id',tt.ticket_type_id,
                'price',tt.ticket_price,
                'type',tt.ticket_type,
                'event',json_object(
                  'id',e.event_id,
                  'type',e.event_type
                   
                  )
                )
          )
        ) tickets
        FROM ticket AS t
          LEFT JOIN ticket_type AS tt
          ON t.ticket_type_id = tt.ticket_type_id
          LEFT JOIN event AS e
          ON tt.event_id = e.event_id
          LEFT JOIN allocation AS a
          ON a.allocation_id = t.allocation_id 
          LEFT JOIN cart AS c
          ON t.cart_id = c.cart_id
          WHERE c.cart_id
            IN (SELECT 
              cart_id 
              FROM cart AS c
              WHERE cart_id = ? )
      ;
    `;
    const conn = this.databaseDao.createDatabase();
    console.log('Getting cart by id', id);
    const result: CartResponseEntity = await new Promise((res, rej) => {
      conn.get(query, [id], (err, rows) => {
        if (err) {
          rej(err);
        }

        const result = {
          ...rows,
          tickets: JSON.parse(rows.tickets),
        };
        res(result as CartResponseEntity);
      });
    });
    conn.close();
    return result;
  }

  async remove(id: number) {
    return this.databaseDao.delete('cart', id);
  }
}
