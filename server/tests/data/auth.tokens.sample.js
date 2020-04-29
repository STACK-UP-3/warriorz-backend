import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tokenData from '../fixtures/token.testData'; 
import { testUsers } from './api.users.sample';

dotenv.config();

const testTokens = {};

/**
 * Valid Tokens
 */

testTokens.requester = jwt.sign(tokenData[0], process.env.JWT_KEY, {
  expiresIn: '1h',
});

testTokens.manager = jwt.sign(tokenData[1], process.env.JWT_KEY, {
  expiresIn: '1h',
});

testTokens.superAdmin = jwt.sign(tokenData[2], process.env.JWT_KEY, {
  expiresIn: '1h',
});

testTokens.supplier = jwt.sign(testUsers.supplier, process.env.JWT_KEY, {
  expiresIn: '1h',
});

testTokens.travelAdmin = jwt.sign(testUsers.travelAdmin, process.env.JWT_KEY, {
  expiresIn: '1h',
});

// Valid token for database User

/**
 * Invalid Tokens
 */

testTokens.invalidRole = jwt.sign(testUsers.invalidRole, process.env.JWT_KEY, {
  expiresIn: '1h',
});

// Sign token with random data
testTokens.random = jwt.sign({}, process.env.JWT_KEY, {
  expiresIn: '1h',
});

/**
 * Test tokens for Logout API
 */

testTokens.logout = {};

testTokens.validForLogout = jwt.sign(
  testUsers.validForLogout,
  process.env.JWT_KEY,
  {
    expiresIn: '1h',
  },
);

testTokens.logout.noUser = jwt.sign(testUsers.ghost, process.env.JWT_KEY, {
  expiresIn: '1h',
});

testTokens.logout.tokenless = jwt.sign(
  testUsers.tokenless,
  process.env.JWT_KEY,
  {
    expiresIn: '1h',
  },
);

testTokens.logout.mistoken = jwt.sign(testUsers.mistoken, process.env.JWT_KEY, {
  expiresIn: '1h',
});

testUsers.mistoken.lastname = 'Random';
testTokens.logout.mismatched = jwt.sign(
  testUsers.mistoken,
  process.env.JWT_KEY,
  {
    expiresIn: '1h',
  },
);

export { testTokens };
