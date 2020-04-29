import dotenv from 'dotenv';

dotenv.config();

export function up(queryInterface) {
  return queryInterface.bulkInsert('triprequests', [{
    trip_id: 1,
    user_id: 2,
    line_manager_id: 2,
    status: 'accepted',
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    trip_id: 2,
    user_id: 1,
    line_manager_id: 2,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    trip_id: 3,
    user_id: 2,
    line_manager_id: 4,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    trip_id: 4,
    user_id: 4,
    line_manager_id: 5,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
], {});
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('triprequests', null, {});
}
