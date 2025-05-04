import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import User from './schemas/userSchema';
import Room from './schemas/roomSchema';
import Booking from './schemas/bookingSchema';
import Contact from './schemas/contactSchema';
import { connectToMongo } from './database/mongoConnection';

async function seed() {
  await connectToMongo();
  console.log('Conectado a MongoDB');

  await Promise.all([
    User.deleteMany({}),
    Room.deleteMany({}),
    Booking.deleteMany({}),
    Contact.deleteMany({}),
  ]);

  const users = Array.from({ length: 10 }, () => new User({
    photo: faker.image.avatar(),
    id: faker.number.int(),
    name: faker.person.fullName(),
    mail: faker.internet.email(),
    job: faker.person.jobTitle(),
    phone: faker.phone.number(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    startDate: faker.date.past().toLocaleDateString('en-GB'),
    endDate: faker.date.future().toLocaleDateString('en-GB'),
  }));
  await User.insertMany(users);

  const rooms = Array.from({ length: 10 }, () => new Room({
    id: faker.number.int(),
    photo: [
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
    ],
    roomNumber: faker.number.int({ min: 1, max: 100 }),
    roomType: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Suite', 'Deluxe Suite']),
    amenities: faker.commerce.productMaterial(),
    price: faker.number.int({ min: 500, max: 10000 }),
    offer_price: faker.number.int({ min: 100, max: 1000 }),
    status: faker.helpers.arrayElement(['available', 'booked']),
  }));
  await Room.insertMany(rooms);

  const bookings = Array.from({ length: 10 }, () => new Booking({
    id: faker.number.int(),
    guest: faker.person.fullName(),
    orderDate: faker.date.past().toLocaleDateString('en-GB'),
    checkIn: faker.date.future().toLocaleDateString('en-GB'),
    checkOut: faker.date.future().toLocaleDateString('en-GB'),
    special: faker.lorem.sentence(),
    roomType: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Suite', 'Deluxe Suite']),
    roomNumber: faker.number.int({ min: 1, max: 100 }),
    bookStatus: faker.helpers.arrayElement(['in', 'out', 'progress']),
    photo: [
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
    ],
  }));
  await Booking.insertMany(bookings);

  const contacts = Array.from({ length: 10 }, () => new Contact({
    photo: faker.image.avatar(),
    id: faker.number.int(),
    date: faker.date.recent().toLocaleDateString('en-GB'),
    customer: faker.person.fullName(),
    mail: faker.internet.email(),
    phone: faker.phone.number(),
    subject: faker.lorem.word(),
    comment: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['new', 'read', 'closed']),
  }));
  await Contact.insertMany(contacts);

  console.log('Seed completado exitosamente');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Error durante el seed:', err);
  mongoose.disconnect();
});




/*

Consola:

PS C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv> npm run seed

> seed
> ts-node seed.ts

Conectado a MongoDB correctamente
Conectado a MongoDB
Error durante el seed: MongoBulkWriteError: E11000 duplicate key error collection: miranda-mongodb.rooms index: roomNumber_1 dup key: { roomNumber: 58 }
    at OrderedBulkOperation.handleWriteError (C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv\node_modules\mongodb\src\bulk\common.ts:1224:13)
    at executeCommands (C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv\node_modules\mongodb\src\bulk\common.ts:587:19)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async BulkWriteShimOperation.execute (C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv\node_modules\mongodb\src\bulk\common.ts:882:12)
    at async tryOperation (C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv\node_modules\mongodb\src\operations\execute_operation.ts:283:14)
    at async executeOperation (C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv\node_modules\mongodb\src\operations\execute_operation.ts:115:12)
    at async OrderedBulkOperation.execute (C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv\node_modules\mongodb\src\bulk\common.ts:1211:12)
    at async BulkWriteOperation.execute (C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv\node_modules\mongodb\src\operations\bulk_write.ts:60:12)
    at async InsertManyOperation.execute (C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv\node_modules\mongodb\src\operations\insert.ts:147:19)
    at async tryOperation (C:\Users\marcosrob\Desktop\Curso_OXYGEN\APUNTES_OXYGEN\MÓDULO_4\node-rooms-csv\node_modules\mongodb\src\operations\execute_operation.ts:283:14) {
  errorLabelSet: Set(0) {},
  errorResponse: {
    message: 'E11000 duplicate key error collection: miranda-mongodb.rooms index: roomNumber_1 dup key: { roomNumber: 58 }',
    code: 11000,
    writeErrors: [ [Object] ]
  },
  code: 11000,
  writeErrors: [ { err: [Object], index: 6 } ],
  result: BulkWriteResult {
    insertedCount: 6,
    matchedCount: 0,
    modifiedCount: 0,
    deletedCount: 0,
    upsertedCount: 0,
    upsertedIds: {},
    insertedIds: {
      '0': new ObjectId('681774df0318f45d85bb8e7c'),
      '1': new ObjectId('681774df0318f45d85bb8e7d'),
      '2': new ObjectId('681774df0318f45d85bb8e7e'),
      '3': new ObjectId('681774df0318f45d85bb8e7f'),
      '4': new ObjectId('681774df0318f45d85bb8e80'),
      '5': new ObjectId('681774df0318f45d85bb8e81')
    }
  },
  insertedDocs: [
    {
      photo: [Array],
      roomNumber: 73,
      roomType: 'Single Bed',
      amenities: 'Wooden',
      price: 697,
      offer_price: 409,
      status: 'booked',
      _id: new ObjectId('681774df0318f45d85bb8e7c'),
      __v: 0,
      createdAt: 2025-05-04T14:08:31.393Z,
      updatedAt: 2025-05-04T14:08:31.393Z
    },
    {
      photo: [Array],
      roomNumber: 20,
      roomType: 'Deluxe Suite',
      amenities: 'Steel',
      price: 988,
      offer_price: 822,
      status: 'available',
      _id: new ObjectId('681774df0318f45d85bb8e7d'),
      __v: 0,
      createdAt: 2025-05-04T14:08:31.394Z,
      updatedAt: 2025-05-04T14:08:31.394Z
    },
    {
      photo: [Array],
      roomNumber: 97,
      roomType: 'Suite',
      amenities: 'Marble',
      price: 1210,
      offer_price: 937,
      status: 'available',
      _id: new ObjectId('681774df0318f45d85bb8e7e'),
      __v: 0,
      createdAt: 2025-05-04T14:08:31.394Z,
      updatedAt: 2025-05-04T14:08:31.394Z
    },
    {
      photo: [Array],
      roomNumber: 30,
      roomType: 'Double Bed',
      amenities: 'Bronze',
      price: 6680,
      offer_price: 779,
      status: 'available',
      _id: new ObjectId('681774df0318f45d85bb8e7f'),
      __v: 0,
      createdAt: 2025-05-04T14:08:31.394Z,
      updatedAt: 2025-05-04T14:08:31.394Z
    },
    {
      photo: [Array],
      roomNumber: 58,
      roomType: 'Suite',
      amenities: 'Plastic',
      price: 4215,
      offer_price: 721,
      status: 'booked',
      _id: new ObjectId('681774df0318f45d85bb8e80'),
      __v: 0,
      createdAt: 2025-05-04T14:08:31.394Z,
      updatedAt: 2025-05-04T14:08:31.394Z
    },
    {
      photo: [Array],
      roomNumber: 32,
      roomType: 'Double Bed',
      amenities: 'Steel',
      price: 6626,
      offer_price: 171,
      status: 'available',
      _id: new ObjectId('681774df0318f45d85bb8e81'),
      __v: 0,
      createdAt: 2025-05-04T14:08:31.394Z,
      updatedAt: 2025-05-04T14:08:31.394Z
    }
  ]
}
*/