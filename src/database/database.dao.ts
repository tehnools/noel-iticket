import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';

@Injectable()
export class DatabaseDao {
  // for the sake of time this is set as public
  public db: Database;

  constructor() {
    this.init();
  }

  private init() {
    // this.createTables();
    // this.insertData();
  }

  public createDatabase() {
    return new Database('test.sqlite3', (err) => {
      if (err) {
        console.log('Getting error ' + err);
        throw err;
      }
    });
  }

  private async insertData() {
    const conn = this.createDatabase();
    conn.serialize(async () => {
      this.insert('event', {
        event_id: 1,
        event_name: 'Ghost of Michael Jackson: On Tour 2021',
        event_image_url:
          'https://upload.wikimedia.org/wikipedia/en/c/c8/Ghosts_MJ.jpg',
        event_type: 'allocated',
        booking_limit: 15,
      });

      this.insert('event', {
        event_id: 2,
        event_name: "Elon Musk's Fun Doge Party",
        event_image_url: 'https://i.redd.it/g4tnkm3pzvv61.jpg',
        event_type: 'generalAdmission',
        booking_limit: 15,
      });

      const seatNumbers = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      ];
      for (const seatNumber of seatNumbers) {
        this.insert('allocation', {
          allocation_id: seatNumber,
          event_id: 1,
          value: seatNumber,
        });
      }

      this.insert('allocation', {
        allocation_id: 51,
        value: 1,
        event_id: 2,
      });

      this.insert('ticket_type', {
        ticket_type_id: 1,
        event_id: 1,
        ticket_price: 25,
        ticket_type: 'Adult',
      });

      this.insert('ticket_type', {
        ticket_type_id: 2,
        event_id: 1,
        ticket_price: 15,
        ticket_type: 'Child',
      });
      await this.close(conn);
    });
  }

  // Enables foreign keys first
  private async createTables() {
    const conn = this.createDatabase();
    conn.exec(
      ` 
    PRAGMA foreign_keys = ON; 
    create table IF NOT EXISTS event (
        event_id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT NOT null,
        event_image_url TEXT NOT null,
        event_type TEXT NOT null,
        booking_limit int NOT null
    );

    create table IF NOT EXISTS allocation (
        allocation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        value INTEGER NOT null,
        event_id INTEGER NOT null,
        FOREIGN KEY (event_id) REFERENCES event(event_id)
        ON DELETE CASCADE
    );
    
    create table IF NOT EXISTS cart (
      cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
      cart_total int NOT null
    );

    create table IF NOT EXISTS ticket (
        ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id INTEGER NOT null,
        ticket_type_id INTEGER NOT null,
        allocation_id INTEGER NOT null,
        FOREIGN KEY (cart_id) REFERENCES cart(cart_id) 
        ON DELETE CASCADE,
        FOREIGN KEY (ticket_type_id) REFERENCES ticket_type(ticket_type_id) 
        ON DELETE CASCADE,
        FOREIGN KEY (allocation_id) REFERENCES allocation(allocation_id) 
        ON DELETE CASCADE
    );

    create table IF NOT EXISTS ticket_type (
        ticket_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_price INTEGER NOT null,
        ticket_type TEXT NOT null,
        event_id INTEGER NOT null,
        FOREIGN KEY (event_id) REFERENCES event(event_id)
        ON DELETE CASCADE
    );
    `,
      async (err) => {
        if (err) {
          console.log('Getting error ' + err);
          throw err;
        }
      },
    );
    await this.close(conn);
  }

  public async insert(
    tableName: string,
    params: { [key: string]: string | number },
  ): Promise<number> {
    const query = `INSERT INTO ${tableName} (${Object.keys(params)
      .map((key) => key)
      .join(', ')}) VALUES (${Object.keys(params).map(() => '?')})`;
    const values = Object.values(params);
    const conn = this.createDatabase();
    const result = await new Promise<number>((res, rej) => {
      console.info('Values', values);
      conn.run(query, values, function (err) {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res(this.lastID);
      });
    });
    await this.close(conn);
    return result;
  }

  public async getAll<T>(tableName: string): Promise<T[]> {
    const query = `SELECT * FROM ${tableName};`;
    const conn = this.createDatabase();
    const result: T[] = await new Promise((res, rej) => {
      conn.get(query, (err, rows) => {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res(rows);
      });
    });
    await this.close(conn);
    return result;
  }

  public async getById<T>(tableName: string, id: number): Promise<T> {
    const query = `SELECT * FROM ${tableName} WHERE ${tableName}_id = ?;`;
    const conn = this.createDatabase();
    const result: T = await new Promise((res, rej) => {
      conn.get(query, [id], (err, row) => {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res(row);
      });
    });
    await this.close(conn);
    console.log('getById result', result);
    return result;
  }

  public async updateById(
    tableName: string,
    id: number,
    params: { [key: string]: string | number },
  ): Promise<void> {
    const query = `UPDATE ${tableName}
    SET ${Object.keys(params)
      .map((key) => `${key} = ?`)
      .join(',')}
    WHERE ${tableName}_id  = ?
    ;`;

    console.info('UPDATING QUERY: ' + query);
    const conn = this.createDatabase();
    await new Promise((res, rej) => {
      const values = [...Object.values(params), Number(id)];
      console.info('Values', values);
      conn.run(query, values, function (err) {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res(true);
      });
    });
    await this.close(conn);
  }

  public async delete(tableName: string, id: number): Promise<void> {
    const query = `DELETE FROM ${tableName} WHERE ${tableName}_id = ?;`;
    const conn = this.createDatabase();
    await new Promise((res, rej) => {
      conn.run(query, [id], (err) => {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res(true);
      });
    });
    await this.close(conn);
  }

  async close(conn: Database): Promise<void> {
    return new Promise((res, rej) => {
      conn.close((err) => {
        if (err) {
          rej(err);
        }
        console.log('Closde database connection');
        res();
      });
    });
  }
}
