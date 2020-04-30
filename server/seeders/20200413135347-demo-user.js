import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export async function up(queryInterface) {
  return queryInterface.bulkInsert(
    'users',
    [
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
      // Requester user (not verified)
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
      // Manager user (verified)
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
      // Supplier user (verified)
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
      // Travel admin user (verified)
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
      // Super admin user
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
    ],
    {},
  );
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('users', null, {});
}
