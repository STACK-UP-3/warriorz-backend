import app from './app';
import { startSocket } from './helpers/socketConnection';

const PORT = process.env.PORT || process.env.HTTP_PORT || 5000;

export const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
}); 

startSocket(server);
