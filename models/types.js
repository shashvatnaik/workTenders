import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const typesSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    permissions: {
        type: Object,
        default: {}
    }
});

const Types = mongoose.model('types', typesSchema);

module.exports = {Types};