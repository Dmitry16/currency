const express = require('express');
const app = express();
require('./libs/mongoose');

// const db = mongoose.connection.db;
const Currency = require('./models/currency');
let data;

Currency.find({}, (err, res) => {
    if (err) console.log('err:', err);
    data = res;
});

app.get('/currencyRates', (req, res) => {
    res.send(data);
})

const port = process.env.PORT || 3001;
app.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`listening to the port ${port}...`);
});