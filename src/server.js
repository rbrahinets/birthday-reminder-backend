const makeApp = require('./app');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const db = require('./db/db');

connectDb();

const PORT = process.env.PORT || 8080;
const app = makeApp(db);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
