import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BidsSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    estimatedAmount: {
        type: Number
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    tenderId: {
        type: mongoose.Types.ObjectId,
        ref: 'Tenders'
    }
});

const Bids = mongoose.model('Bid', BidsSchema);

module.exports = { Bids };