import mongoose from "../../database/index.js";
import bcrypt from "bcrypt";
import Slugify from "../../utils/Slugify.js";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    icon: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetTokenExpiration: {
        type: String,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre("save", function (next) {
    bcrypt
        .hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch((error) => {
            console.error("Error hashing password", error);
        });

    // this.icon = Slugify("icon");
});

export default mongoose.model("user", UserSchema);
