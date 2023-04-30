const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

//Unhandling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejection');

  process.exit(1);
});

// config
dotenv.config({ path: 'backend/config/config.env' });

// after setting config connect to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

// Unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejection');

  server.close(() => {
    process.exit(1);
  });
});
