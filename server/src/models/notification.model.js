import { model, Schema } from "mongoose";

const notificationSchema = new Schema({

    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['new-request', 'help-offer', 'solved', 'badge'],
        default: 'new-request'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    link: {
        type: String
    },

}, { timestamps: true });

const Notification = model("Notification", notificationSchema);
export default Notification;
