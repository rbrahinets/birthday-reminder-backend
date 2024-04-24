const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const app = require('./app')

connectDb().then();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
