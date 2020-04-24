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

// Valid user for testing logout API
testUsers.validForLogout = {
  firstname: 'Logout',
  lastname: 'User',
  email: 'logout@example.com',
  passwordPlain: 'logout',
  bio: 'Valid user. For testing purposes only.',
  role: 'Requester',
  isVerified: true,
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

// User, unverified, with valid data
testUsers.unverified = {
  firstname: 'Sample',
  lastname: 'User',
  email: 'sample@example.com',
  passwordPlain: 'sample',
  bio: 'Valid user. For testing purposes only.',
  role: 'Requester',
};

// User with invalid data
testUsers.invalid = {
  firstname: 'Invalid',
  lastname: 'User',
  email: '',
  passwordPlain: 'pwd',
  bio: '',
  role: 'No Role',
};

testUsers.ghost = {
  firstname: 'Non-existent',
  lastname: 'User',
  email: 'nouser@example.com',
  passwordPlain: 'nouser',
  bio: 'For testing purposes only. Does not exist in the database.',
};

testUsers.tokenless = {
  firstname: 'Tokenless',
  lastname: 'User',
  email: 'tokenless@example.com',
  passwordPlain: 'tokenless',
  bio: 'For testing purposes only. Does not have a token associated.',
  token: null,
};

testUsers.mistoken = {
  firstname: 'Mistoken',
  lastname: 'User',
  email: 'mistoken@example.com',
  passwordPlain: 'mistoken',
  bio: 'For testing purposes only. Has a mismatched token.',
  token: null,
};

export { testUsers };
