
let mongoose = require('mongoose');
let config = require('config');

mongoose.connect(
    config.get('mongoose.uri'), 
    // config.get('mongoose.options'), 
    { useNewUrlParser: true }
);

module.exports = mongoose;