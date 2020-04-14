import dotenv from 'dotenv';

dotenv.config();

export function up(queryInterface) {
  return queryInterface.bulkInsert('users', [{
    firstname: 'IRADUKUNDA',
    lastname: 'Fiacre',
    email: 'firaduk@yahoo.com',
    password: '$2b$10$qToxNQmDVi28Rrj8gwFhYOI0xIe5mFNOAkKQ7vkTJrDD63v7nunue',
    bio:'fullstack magician',
    role: 'user',
    isVerified: true,
    token: process.env.PASSING_TOKEN,
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    firstname: 'NDOLI',
    lastname: 'Jack',
    email: 'ndoliOg@gmail.com',
    password: '$2b$10$qToxNQmDVi28Rrj8gwFhYOI0xIe5mFNOAkKQ7vkTJrDD63v7nunue',
    bio:'Onatracom worker',
    role: 'manager',
    isVerified: true,
    token: process.env.UN_VERIFIED_TOKEN,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('users', null, {});
}
