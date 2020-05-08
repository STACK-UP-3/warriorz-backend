import dotenv from 'dotenv';

dotenv.config();

export function up(queryInterface) {
  return queryInterface.bulkInsert('notifications', [{ 
    // return trip created by the user to the manager
    trip_request_id: 1,
    user_id: 1,
    line_manager_id: 2, 
    subject: 'return trip request created',
    description:' A return-trip has been Created, From Kigali To Kampala on 2020-10-20', 
    isRead: false,
    emailSent: true,
    managerEmailSent: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // one way trip created by the user to the manager
  {
    trip_request_id: 2,
    user_id: 1,
    line_manager_id: 2, 
    subject: 'one-way-trip request created',
    description:' A one-way-trip has been Created, From Kigali To Bujumbura on 2020-10-20', 
    isRead: false,
    emailSent: true,
    managerEmailSent: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  //  belongs to both another manager and another user
  {
    trip_request_id: 4,
    user_id: 4,
    line_manager_id: 5, 
    subject: 'one-way-trip request created',
    description:'This does not belong either to the user or the manager', 
    isRead: false,
    emailSent: true,
    managerEmailSent: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
], {});
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('notifications', null, {});
}
