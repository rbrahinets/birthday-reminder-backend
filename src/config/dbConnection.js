const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false);
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(
      `Database connected: ${connect.connection.host} ${connect.connection.name}`
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = connectDb;
