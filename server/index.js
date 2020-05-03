import app from './app';

const PORT = process.env.PORT || process.env.HTTP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n Express Server - listening on port: ${PORT} \n`);
});
