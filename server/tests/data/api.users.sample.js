const testUsers = {};

/**
 * Valid Users
 */

// Basic user
testUsers.basic = {
  firstname: 'Test',
  lastname: 'User',
  email: 'test@example.com',
  passwordPlain: 'test',
  bio: 'Valid user. For testing purposes only.',
  role: 'Requester',
};

// Requester user
testUsers.requester = {
  firstname: 'Regular',
  lastname: 'User',
  email: 'regular@example.com',
  passwordPlain: 'regular',
  bio: 'Valid user. For testing purposes only.',
  role: 'Requester',
};

// Manager user
testUsers.manager = {
  firstname: 'Managerial',
  lastname: 'User',
  email: 'managerial@example.com',
  passwordPlain: 'managerial',
  bio: 'Valid user. For testing purposes only.',
  role: 'Manager',
};

// Supplier user
testUsers.supplier = {
  firstname: 'Supply',
  lastname: 'User',
  email: 'supply@example.com',
  passwordPlain: 'supply',
  bio: 'Valid user. For testing purposes only.',
  role: 'Supplier',
};

// Travel admin user
testUsers.travelAdmin = {
  firstname: 'Travel',
  lastname: 'Admin',
  email: 'travel@example.com',
  passwordPlain: 'travel',
  bio: 'Valid user. For testing purposes only.',
  role: 'Travel Administrator',
};

// Super admin user
testUsers.superAdmin = {
  firstname: 'Super',
  lastname: 'Admin',
  email: 'super@example.com',
  passwordPlain: 'super',
  bio: 'Valid user. For testing purposes only.',
  role: 'Super Administrator',
};

/**
 * Invalid Users
 */

// Random user: invalid role
testUsers.invalidRole = {
  firstname: 'Random',
  lastname: 'User',
  email: 'random@example.com',
  passwordPlain: 'random',
  bio: 'Invalid user. For testing purposes only.',
  role: 'Ghost Role',
};

// Random user: missing email
testUsers.missingEmail = {
  firstname: 'Random',
  lastname: 'User',
  email: '',
  passwordPlain: 'random',
  bio: 'Invalid user. For testing purposes only.',
  role: 'Requester',
};

// Random user: missing password
testUsers.missingPassword = {
  firstname: 'Random',
  lastname: 'User',
  email: 'random@example.com',
  passwordPlain: '',
  bio: 'Invalid user. For testing purposes only.',
  role: 'Requester',
};

export { testUsers };
