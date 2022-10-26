const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Invalid email",
        ],
    },
    password: { type: String, required: true },
    isAdmin:{ type: Boolean, required:true},
    userAvatar:{ type: String, required:true},
    }
);
UserSchema.index({ email: 1 });
module.exports = UserSchema;