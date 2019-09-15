import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TendersSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    description: {
        type: String
    },
    pictures: {
        type: Array,
        default: []
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    expectedTime: {
        type: Number
    },
    location: {
        type: Object,
        required: true
    }

});

const Tenders = mongoose.model('Tenders', TendersSchema);

module.exports = {Tenders};