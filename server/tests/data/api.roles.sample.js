const testRoles = {};

// Valid instance
testRoles.valid = {
  name: 'Admin',
  permissions: 'create-trip,edit-trip',
};

// Missing name
testRoles.missingName = { name: '', permissions: 'create-trip,edit-trip' };
// Missing permissions
testRoles.missingPermissions = { name: 'Admin', permissions: '' };
// Missing values
testRoles.missingValues = { name: '', permissions: '' };
// Valid instance update
testRoles.updatedName = { name: 'Administrator' };

export { testRoles };
