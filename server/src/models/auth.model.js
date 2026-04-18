import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// joi validation schema
/* const patientJoiSchema = joi.object({
    firstName: joi.string().min(3).max(30),
    lastName: joi.string().min(3).max(30),
    username: joi.string().min(4).max(10).required(),
    dob: joi.string(),
    email: joi.string(),
    address: joi.string(),
    phone: joi.string().pattern(/^[0-9]{11}$/).required(),
    password: joi.string(),
})
const patientSchema = new Schema(patientJoiSchema, { timestamps: true }); */

const userSchema = new Schema({

    fullName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        match: [/^[a-z0-9_-]+$/, "Username is invalid"],
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, "username is required"],
        index: true
    },
    phoneNumber: {
        type: Number,
        required: [true, "phone number is required"]
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Enter a valid email address.'
        ],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "email is required"]
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
        // required: true
    },
    emergencyContact: {
        type: String,
    },
    password: {
        type: String,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Enter a strong password"
        ],
        required: true
    },
    role: {
        type: String,
        enum: ['need-help', 'can-help', 'both'],
        default: 'both'
    },
    skills: [{ type: String }],
    interests: [{ type: String }],
    location: { type: String },
    isOnboarded: { type: Boolean, default: false },
    trustScore: { type: Number, default: 0 },
    badges: [{ type: String }],
    totalHelped: { type: Number, default: 0 },
    totalRequests: { type: Number, default: 0 },


    refreshToken: {
        type: String,
    },

}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.refreshToken;
    return obj;
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    // next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    );
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}

const User = model("User", userSchema);
export default User;
