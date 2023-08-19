const makeApp = require('./app');

const PORT = process.env.PORT || 8080;
const app = makeApp();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
