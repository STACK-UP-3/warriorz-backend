import app from './app';

const PORT = process.env.HTTP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
