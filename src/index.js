const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        title: 'Hello friend',
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
