import dotenv from 'dotenv';

dotenv.config();

export function up(queryInterface) {
  return queryInterface.bulkInsert('usermanagements', [{
    line_manager_id: 2,
    user_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('usermanagements', null, {});
}
