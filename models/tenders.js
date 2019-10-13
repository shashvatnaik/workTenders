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
    picture: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    location: {
        type: Object,
        required: true
    }

});

const Tenders = mongoose.model('Tenders', TendersSchema);

module.exports = { Tenders };