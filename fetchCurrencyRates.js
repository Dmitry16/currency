const fetch = require('node-fetch');
const mongoose = require('libs/mongoose');
const async = require('async');

const Currency = require('models/currency');
// console.log('readyState1::', mongoose.connection.readyState);


let data;
// const db = mongoose.connection.db;

const appKey = process.env.OPEX_KEY;
const url = `https://openexchangerates.org/api/latest.json?app_id=${appKey}`;

const fetchData = async () => {
    const res = await fetch(url);
    data = await res.json();
}

const dropDB = () => {
    console.log('readyState2::', mongoose.connection.readyState);
    mongoose.connection.on('open', () => {
        const db = mongoose.connection.db;
        db.dropDatabase((err) => {
            if (err) throw err;
            console.log('db was killed!!')
        });
    });
}

const saveData = () => {
    console.log('readyState3::', mongoose.connection.readyState);
    // console.log('data', data.rates);
    const currency = new Currency({ crs: data, date: new Date });
    currency.save()
        .then((err, affected) => {
            Currency.find({}, (err, res) => {
                if (err) console.log('err:', err);
                // if (res) console.log('res:', res);
                // mongoose.connection.close();
            })
        })
    .catch(err => console.log(err));
}

async.series([
    // dropDB,
    fetchData,
    saveData,
    ]
);


