import { Database } from 'sqlite3';

export class DatabaseDao {
  // for the sake of time this is set as public
  public db: Database;

  constructor() {
    this.init();
  }

  private init() {
    this.db = this.createDatabase();
  }

  private createDatabase() {
    return new Database('test.sqlite3', (err) => {
      if (err) {
        console.log('Getting error ' + err);
        throw err;
      }
      this.createTables();
      //   this.insertData();
    });
  }

  private async insertData() {
    this.db.serialize(() => {
      this.insert('event', {
        id: 1,
        event_name: 'Ghost of Michael Jackson: On Tour 2021',
        event_image_url:
          'https://upload.wikimedia.org/wikipedia/en/c/c8/Ghosts_MJ.jpg',
        event_type: 'allocated',
        booking_limit: 15,
      });

      this.insert('event', {
        id: 2,
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
          id: seatNumber,
          event_id: 1,
          allocation_value: seatNumber,
        });
      }

      this.insert('allocation', {
        id: 1,
        allocation_value: 1,
        event_id: 2,
      });

      this.insert('ticket_type', {
        id: 1,
        event_id: 1,
        ticket_price: 25,
        ticket_type: 'Adult',
      });

      this.insert('ticket_type', {
        id: 2,
        event_id: 1,
        ticket_price: 15,
        ticket_type: 'Child',
      });
    });
  }

  // Enables foreign keys first
  private createTables() {
    this.db.exec(
      ` 
    PRAGMA foreign_keys = ON; 
    create table IF NOT EXISTS event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT NOT null,
        event_image_url TEXT NOT null,
        event_type TEXT NOT null,
        booking_limit int NOT null
    );

    create table IF NOT EXISTS allocation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value INTEGER NOT null,
        event_id INTEGER NOT null,
        FOREIGN KEY (event_id) REFERENCES event(id)
        ON DELETE CASCADE
    );
    
    create table IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_total int NOT null
    );

    create table IF NOT EXISTS ticket (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id INTEGER NOT null,
        ticket_type_id INTEGER NOT null,
        allocation_id INTEGER NOT null,
        FOREIGN KEY (cart_id) REFERENCES cart(id) 
        ON DELETE CASCADE,
        FOREIGN KEY (ticket_type_id) REFERENCES ticket_type(id) 
        ON DELETE CASCADE,
        FOREIGN KEY (allocation_id) REFERENCES allocation(id) 
        ON DELETE CASCADE,
        UNIQUE(cart_id, ticket_type_id, allocation_id)
    );

    create table IF NOT EXISTS ticket_type (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_price INTEGER NOT null,
        ticket_type TEXT NOT null,
        FOREIGN KEY (event_id) REFERENCES event(id)
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
  }

  public async insert(
    tableName: string,
    params: { [key: string]: string | number },
  ): Promise<number> {
    const query = `INSERT INTO ${tableName} (${Object.keys(params)
      .map((key) => key)
      .join(', ')}) VALUES (${Object.keys(params).map(() => '?')})`;
    const values = Object.values(params);

    return new Promise((res, rej) => {
      console.info('INSERTNG QUERY: ' + query);
      console.info('Values', values);
      this.db.run(query, values, function (err) {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res(this.lastID);
      });
    });
  }

  public async getAll<T>(tableName: string, id: number): Promise<T[]> {
    const query = `SELECT * FROM ${tableName} WHERE id = ?;`;
    return new Promise((res, rej) => {
      this.db.get(query, [id], (err, rows) => {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res(rows);
      });
    });
  }

  public async getById<T>(tableName: string, id: number): Promise<T> {
    const query = `SELECT * FROM ${tableName} WHERE id = ?;`;
    return new Promise((res, rej) => {
      this.db.get(query, [id], (err, row) => {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res(row);
      });
    });
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
    WHERE ID = ?
    ;`;

    return new Promise((res, rej) => {
      const values = [...Object.values(params), id];
      console.info('UPDATING QUERY: ' + query);
      console.info('Values', values);

      this.db.run(query, values, function (err) {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res();
      });
    });
  }

  public delete(tableName: string, id: number): Promise<void> {
    const query = `DELETE FROM ${tableName} WHERE id = ?;`;
    return new Promise((res, rej) => {
      this.db.run(query, [id], (err) => {
        if (err) {
          console.error(`Query Error: ${err}`);
          rej(err);
        }
        res();
      });
    });
  }

  async close() {
    this.db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closde database connection');
    });
  }
}
