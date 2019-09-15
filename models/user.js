const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'types'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    about: {
        type: String,
        default: ''
    },
    preferences: {
        type: Array,
        default: []
    },
    profile: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };