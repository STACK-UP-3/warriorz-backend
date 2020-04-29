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

export { testTokens };
