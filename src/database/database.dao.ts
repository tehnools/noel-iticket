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
    });
  }

  // Enables foreign keys first
  createTables() {
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

    create table IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_total int NOT null
    );

    create table IF NOT EXISTS ticket(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        price INTEGER NOT null,
        type TEXT NOT null,
        event_id INTEGER NOT null,
        FOREIGN KEY (event_id) REFERENCES event(id) 
        ON DELETE CASCADE
    );

    create table IF NOT EXISTS cart_to_event(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id INTEGER NOT null,
        event_id INTEGER  NOT null,
        FOREIGN KEY (cart_id) REFERENCES cart(id) 
        ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES event(id) 
        ON DELETE CASCADE,
        UNIQUE(cart_id, event_id)
    );

    create table IF NOT EXISTS seat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value INTEGER NOT null UNIQUE
    );

    create table IF NOT EXISTS cart_to_seat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id INTEGER NOT null,
        seat_id INTEGER NOT null,
        UNIQUE(cart_id, seat_id)
    );
  
    create table IF NOT EXISTS ga_area (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value INTEGER NOT null,
        event_id INTEGER NOT null,
        FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
    );
    `,
      (err) => {
        if (err) {
          console.log('Getting error ' + err);
          throw err;
        }
        //TODO write default data
      },
    );
  }

  // Insert row, values denoted
  public async insert(
    tableName: string,
    params: { [key: string]: string | number },
  ): Promise<number> {
    const query = `INSERT INTO ${tableName} (${Object.keys(params)
      .map((key) => key)
      .join(', ')}) VALUES (${Object.keys(params).map(
      () => '?',
    )}) RETURNING id`;
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

  // Insert row, values denoted
  public async update(
    tableName: string,
    params: { [key: string]: string | number },
    condition: string,
  ): Promise<void> {
    const query = `UPDATE ${tableName}
    SET ${Object.keys(params)
      .map((key) => `${key} = ?`)
      .join(',')}
        ${condition} 
    ;`;

    return new Promise((res, rej) => {
      const values = [...Object.values(params), condition];
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

  public delete(queryString: string, values: (string | number)[]) {
    return this.db.run(queryString, values, (err, rows) => {
      if (err) {
        console.error(`Query Error: ${err}`);
        throw err;
      }
      console.log(`rows: ${rows}`);
      return rows;
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
