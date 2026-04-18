import { Schema, model } from 'mongoose';

const requestSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    urgency: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    tags: [{
        type: String
    }],

    status: {
        type: String,
        enum: ['open', 'in-progress', 'solved'],
        default: 'open'
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    helpers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    location: { type: String },

    skills: [{ type: String }],

}, { timestamps: true });

const Request = model('Request', requestSchema);
export default Request;