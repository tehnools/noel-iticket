import { Database, OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';

export class DatabaseDao {
  db: Database;

  constructor() {
    this.init();
  }

  init() {
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

  createTables() {
    this.db.exec(
      `
    create table IF NOT EXISTS ticket(
        id int PRIMARY KEY,
        price int NOT null,
        type TEXT NOT null,
        event_id int NOT null,
        FOREIGN KEY (event_id) REFERENCES event(id)
    );

    create table IF NOT EXISTS event (
            id int PRIMARY KEY,
            event_name TEXT NOT null,
            event_image_url TEXT NOT null,
            event_type TEXT NOT null,
            booking_limit int NOT null
    );

    create table IF NOT EXISTS cart_to_event(
        id int PRIMARY KEY,
        cart_id int NOT null,
        event_id int  NOT null,
        FOREIGN KEY (cart_id) REFERENCES cart(id),
        FOREIGN KEY (event_id) REFERENCES event(id),
        UNIQUE(cart_id, event_id)
    );

    create table IF NOT EXISTS seat (
        id int PRIMARY KEY,
        value int NOT null UNIQUE
    );

    create table IF NOT EXISTS event_to_seat (
        id int PRIMARY KEY,
        event_id int NOT null,
        seat_id int NOT null,
        UNIQUE(event_id, seat_id)
    );
  
    create table IF NOT EXISTS ga_area (
        id int PRIMARY KEY,
        value int NOT null,
        event_id int NOT null,
        FOREIGN KEY (event_id) REFERENCES event(id)
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

  async close() {
    this.db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closde database connection');
    });
  }
}
