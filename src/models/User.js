import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true,  unique: true},
    hashPassword: {type: String, required: true}
}, {versionKey: false})

const user = mongoose.model("User", UserSchema);

export default user;