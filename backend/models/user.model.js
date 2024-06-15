import mongoose, { Schema } from "mongoose";
const serSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dzcmadjl1/image/upload/v164324444/default-profile-picture.jpg",
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    }

}, { timestamps: true })
const User = mongoose.model("User", serSchema);
export default User;