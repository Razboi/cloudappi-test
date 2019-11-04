const mongoose = require("mongoose");
const AddressSchema = mongoose.Schema({
	street: String,
	state: String,
	city: String,
	country: String,
	zip: String
});

const AddressModel = mongoose.model("Address", AddressSchema);
module.exports = AddressModel;