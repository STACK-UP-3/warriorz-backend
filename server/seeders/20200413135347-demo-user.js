import 'dotenv/config';
import bcrypt from 'bcrypt';

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'users',
    [
      {
        firstname: 'IRADUKUNDA',
        lastname: 'Fiacre',
        email: 'firaduk@yahoo.com',
        password:
          '$2b$10$qToxNQmDVi28Rrj8gwFhYOI0xIe5mFNOAkKQ7vkTJrDD63v7nunue',
        bio: 'fullstack magician',
        role: 'Requester',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'NDOLI',
        lastname: 'Jack',
        email: 'ndoliOg@gmail.com',
        password:
          '$2b$10$qToxNQmDVi28Rrj8gwFhYOI0xIe5mFNOAkKQ7vkTJrDD63v7nunue',
        bio: 'Onatracom worker',
        role: 'Manager',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'Admin',
        lastname: 'Example',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin', 10),
        bio: 'Testing purposes only',
        role: 'Super Administrator',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('users', null, {});
}
