import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BidsSchema = new Schema({
    proposal: {
        type: String
    },
    proposedTime: {
        type: String
    },
    sentBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
});