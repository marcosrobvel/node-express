import { faker } from '@faker-js/faker';
import pool from './database/mongoConnection';

async function seed() {

  function formatDateToMySQL(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  const conn = await pool.getConnection();

  try {
    console.log('Conectado a MySQL');

    const usedRoomNumbers = new Set<number>();

    for (let i = 1; i <= 10; i++) {

      await conn.query(`
        INSERT INTO USER (photo, name, mail, job, phone, status, startDate, endDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        faker.image.avatar(),
        faker.person.fullName(),
        faker.internet.email(),
        faker.person.jobTitle(),
        faker.phone.number(),
        faker.helpers.arrayElement(['active', 'inactive']),
        formatDateToMySQL(faker.date.past()),
        formatDateToMySQL(faker.date.future()),
      ]);

      let roomNumber: number;
      do {
        roomNumber = faker.number.int({ min: 1, max: 100 });
      } while (usedRoomNumbers.has(roomNumber));
      usedRoomNumbers.add(roomNumber);

      await conn.query(`
        INSERT INTO ROOM (photo, roomNumber, roomType, amenities, price, offer_price, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        JSON.stringify([faker.image.avatar(), faker.image.avatar(), faker.image.avatar()]),
        roomNumber,
        faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Suite', 'Deluxe Suite']),
        faker.commerce.productMaterial(),
        faker.number.int({ min: 500, max: 10000 }),
        faker.number.int({ min: 100, max: 1000 }),
        faker.helpers.arrayElement(['available', 'booked']),
      ]);

      await conn.query(`
        INSERT INTO BOOKING (guest, orderDate, checkIn, checkOut, special, roomType, roomNumber, bookStatus, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        faker.person.fullName(),
        formatDateToMySQL(faker.date.past()),
        formatDateToMySQL(faker.date.future()),
        formatDateToMySQL(faker.date.future()),
        faker.datatype.boolean() ? faker.lorem.sentence() : null,
        faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Suite', 'Deluxe Suite']),
        Array.from(usedRoomNumbers)[i - 1],
        faker.helpers.arrayElement(['in', 'out', 'progress']),
        JSON.stringify([faker.image.avatar(), faker.image.avatar()]),
      ]);

      await conn.query(`
        INSERT INTO CONTACT (photo, date, customer, mail, phone, subject, comment, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        `https://${faker.internet.domainName()}/${faker.word.words()}`,
        formatDateToMySQL(faker.date.recent()),
        faker.person.fullName(),
        faker.internet.email(),
        faker.phone.number(),
        'New Subject',
        faker.lorem.sentence(),
        faker.helpers.arrayElement(['', 'archived']),
      ]);
    }

    console.log('Seed completado correctamente.');
  } catch (err) {
    console.error('Error durante el seed:', err);
  } finally {
    conn.release();
    pool.end();
  }
}

seed();
