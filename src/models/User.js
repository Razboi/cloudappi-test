const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
	name: String,
	email: String,
	birthDate: String,
	address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;