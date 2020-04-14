import { logger } from '../../logger';

export const infoLogger = (req, status,message)=> logger.info (`METHOD: ${req.method}, and the URL: ${req.originalUrl}, STATUSCODE: ${status} IP-address: ${req.ip}`, message);

export const errorLogger = (req, status,message)=> logger.error (`METHOD: ${req.method}, and the URL: ${req.originalUrl}, STATUSCODE: ${status}, IP-address: ${req.ip}`, message);

export const debugLogger = (req, status,message)=> logger.debug (`METHOD: ${req.method}, and the URL: ${req.originalUrl}, STATUSCODE: ${status}, IP-address: ${req.ip}`, message);
