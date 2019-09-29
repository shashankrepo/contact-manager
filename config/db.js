const mongoose = require('mongoose');
require('dotenv').config();

const DB_CONNECT = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('DB Connected');
  } catch (error) {
    console.log('Could not connect to Database', err);
    process.exit(1);
  }
};

module.exports = DB_CONNECT;
