export default [
  {
    accommodationId: 'invalid',
    roomId: 1,
    tripId: 1,
    checkInDate: new Date(),
    checkOutDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    accommodationId: 1,
    roomId: 1,
    tripId: 1,
    checkInDate: 'new Date()',
    checkOutDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    accommodationId: 1,
    roomId: 1,
    tripId: 1,
    checkInDate: '2020-12-23',
    checkOutDate: '2020-12-22',
  },
  {
    accommodationId: 0,
    roomId: 1,
    tripId: 1,
    checkInDate: '2020-12-21',
    checkOutDate: '2020-12-23',
  },
  {
    accommodationId: 1,
    roomId: 0,
    tripId: 1,
    checkInDate: '2020-12-12',
    checkOutDate: '2020-12-22',
  },
  {
    accommodationId: 1,
    roomId: 1,
    tripId: 1,
    checkInDate: '2020-12-12',
    checkOutDate: '2020-12-22',
  },
  {
    accommodationId: 1,
    roomId: 1,
    tripId: 0,
    checkInDate: '2020-12-12',
    checkOutDate: '2020-12-22',
  },

  // testing accomodation
  // data 7
  {
    name: 'Test booking accommodation',
    owner: 'Robert',
    location: 'Kigali',
    type: 'vip',
    status: 'available',
    availableRooms: 5,
    user_id: 1,
  },
  // data 8
  {
    name: 'Testing room',
    roomNumber: 25,
    cost: '$4',
    type: 'vip',
    status: 'booked',
    similarRooms: 4,
    description: 'no descr',
  },

  // data 9
  {
    checkInDate: '2020-10-12',
    checkOutDate: '2020-10-22',
  },
];
