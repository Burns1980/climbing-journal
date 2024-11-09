const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

const dbConnectionStr = process.env.DATABASE;
const dbpw = process.env.DATABASE_PASSWORD;

mongoose
  .connect(dbConnectionStr.replace('<password>', dbpw))
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.error('An error occurred in the server.js file\n', err);
  });

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
