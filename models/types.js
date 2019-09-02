const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const typesSchema = new Schema({
    name: String,
    permissions: {}
});

const Types = mongoose.model(typesSchema);

module.exports = {Types};