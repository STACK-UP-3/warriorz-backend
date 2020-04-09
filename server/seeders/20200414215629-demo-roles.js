export function up(queryInterface) {
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  return queryInterface.bulkInsert('roles', [
    {
      name: 'Super Administrator',
      permissions: 'edit-permissions,change-roles',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Travel Administrator',
      permissions: 'create-accommodation,edit-accommodation',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Supplier',
      permissions: 'create-own-accommodation,edit-own-accommodation',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Manager',
      permissions: 'create-trip,edit-trip,accept-trip,reject-trip',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Requester',
      permissions: 'create-trip,edit-trip',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export function down(queryInterface) {
  return queryInterface.bulkDelete('roles', null, {});
}
