import dotenv from 'dotenv';

dotenv.config();

export function up(queryInterface) {
  return queryInterface.bulkInsert('trips', [{
    user_id: 4,
    origin: 'Kampala',
    destination: 'Kigali',
    dateOfTravel: '2020-10-10',
    dateOfReturn: '2020-11-11',
    travelReason: 'visiting',
    accommodation_id: 10,
    type: 'return-trip',
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    user_id: 1,
    origin: 'Kampala',
    destination: 'Kigali',
    dateOfTravel: '2020-10-10',
    travelReason: 'visiting',
    accommodation_id: 10,
    type: 'one-way-trip',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('trips', null, {});
}
