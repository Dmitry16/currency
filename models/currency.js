let mongoose = require('../libs/mongoose'),
Schema = mongoose.Schema;

let schema =  new Schema({
     crs: {
        type: Object,
        unique: false,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Currency = mongoose.model('Currency', schema);

module.exports = Currency;

