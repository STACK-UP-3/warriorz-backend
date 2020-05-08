import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'users',
    [
      // 1
      {
        firstname: 'IRADUKUNDA',
        lastname: 'Fiacre',
        email: 'firaduk@yahoo.com',
        password:'$2b$10$qToxNQmDVi28Rrj8gwFhYOI0xIe5mFNOAkKQ7vkTJrDD63v7nunue',
        bio: 'fullstack magician',
        role: 'Requester',
        isVerified: true,
        token: process.env.PASSING_TOKEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 2
      {
        firstname: 'NDOLI',
        lastname: 'Jack',
        email: 'ndoliOg@gmail.com',
        password:'$2b$10$qToxNQmDVi28Rrj8gwFhYOI0xIe5mFNOAkKQ7vkTJrDD63v7nunue',
        bio: 'Onatracom worker',
        role: 'Manager',
        isVerified: true,
        token: process.env.MANAGER_TOKEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 3
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
      // Requester user (not verified) 4
      {
        firstname: 'Regular',
        lastname: 'User',
        email: 'regular@example.com',
        password: await bcrypt.hash('regular', 10),
        bio: 'Valid user. For testing purposes only.',
        role: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Manager user (verified) 5
      {
        firstname: 'Managerial',
        lastname: 'User',
        email: 'managerial@example.com',
        password: await bcrypt.hash('managerial', 10),
        bio: 'Valid user. For testing purposes only.',
        role: 'Manager',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Supplier user (verified) 6
      {
        firstname: 'Supply',
        lastname: 'User',
        email: 'supply@example.com',
        password: await bcrypt.hash('supply', 10),
        bio: 'Valid user. For testing purposes only.',
        role: 'Supplier',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Travel admin user (verified) 7
      {
        firstname: 'Travel',
        lastname: 'Admin',
        email: 'travel@example.com',
        password: await bcrypt.hash('travel', 10),
        bio: 'Valid user. For testing purposes only.',
        role: 'Travel Administrator',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Super admin user 8
      {
        firstname: 'Super',
        lastname: 'Admin',
        email: 'super@example.com',
        password: await bcrypt.hash('super', 10),
        bio: 'Valid user. For testing purposes only.',
        role: 'Super Administrator',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Requester with false email notifications 9

      {
        firstname: 'xxxxx',
        lastname: 'yyyyy',
        email: 'xxxxx@example.com',
        password: await bcrypt.hash('super', 10),
        bio: 'False email notifications. For testing purposes only.',
        role: 'Requester',
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
