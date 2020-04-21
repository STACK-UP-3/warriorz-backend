import jwt from 'jsonwebtoken';

import { testUsers } from './api.users.sample';

const testTokens = {};

/**
 * Valid Tokens
 */

testTokens.requester = jwt.sign(testUsers.requester, process.env.JWT_KEY, {
  expiresIn: '1h',
});

testTokens.manager = jwt.sign(testUsers.manager, process.env.JWT_KEY, {
  expiresIn: '1h',
});

testTokens.supplier = jwt.sign(testUsers.supplier, process.env.JWT_KEY, {
  expiresIn: '1h',
});

testTokens.travelAdmin = jwt.sign(testUsers.travelAdmin, process.env.JWT_KEY, {
  expiresIn: '1h',
});

testTokens.superAdmin = jwt.sign(testUsers.superAdmin, process.env.JWT_KEY, {
  expiresIn: '1h',
});

// Valid token for database User

/**
 * Invalid Tokens
 */

testTokens.invalidRole = jwt.sign(testUsers.invalidRole, process.env.JWT_KEY, {
  expiresIn: '1h',
});

export { testTokens };
