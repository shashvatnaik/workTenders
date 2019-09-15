import mongoose from 'mongoose';
import { stringify } from 'querystring';

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    content: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    read: {
        type: Boolean,
        required: true
    }
})