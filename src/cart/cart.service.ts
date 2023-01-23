import { Injectable } from '@nestjs/common';
import { DatabaseDao } from 'src/database/database.dao';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  databaseDao: DatabaseDao;

  constructor(databaseDao) {
    this.databaseDao = databaseDao;
  }

  async createCart({ eventId, seats, tickets }: CreateCartDto) {
    const query = `SELECT * from seats WHERE`;
    this.databaseDao.db.all([]);

    return 'valid';
    // return this.databaseDao.insert('cart', createCartDto);
  }

  updateCart(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
