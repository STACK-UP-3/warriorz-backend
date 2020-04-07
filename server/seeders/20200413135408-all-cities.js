

export function up(queryInterface) {
  return queryInterface.bulkInsert('cities', [
    { 
      city: 'Kigali',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
    { city: 'Kamembe',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
    { 
      city: 'Bujumbura',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
    { 
      city: 'Gitega',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
    { 
      city: 'Nairobi',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
    { 
      city: 'Mombasa',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
    { 
      city: 'Kampala',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
    { 
      city: 'Mbarara',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
    { 
      city: 'Dodoma',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
    { 
      city: 'Goma',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
    { 
      city: 'Juba',
      createdAt: new Date(),
      updatedAt: new Date(),
  },
  ], {});
}
export function down(queryInterface) {
  return queryInterface.bulkDelete('cities', null, {});
}
