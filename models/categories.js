import mongoose from 'mongoose';
import { stringify } from 'querystring';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
});