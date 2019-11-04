const User = require("../models/User");
const Address = require("../models/Address");

module.exports = {
	getAllUsers: async () => {
		return await User.find()
			.populate("address")
			.exec();
	},

	createNewAddress: async (addressInfo) => {
		try {
			return await new Address({
				street: addressInfo.street,
				state: addressInfo.state,
				city: addressInfo.city,
				country: addressInfo.country,
				zip: addressInfo.zip
			}).save();
		} catch (error) {
			throw new Error(error.message);
		}
	},

	createNewUser: async (userInfo, persistedAddressId) => {
		try {
			return await new User({
				name: userInfo.name,
				email: userInfo.email,
				birthDate: userInfo.birthDate,
				address: persistedAddressId
			}).save();
		} catch (error) {
			throw new Error(error.message);
		}
	},

	findUserById: async (userId) => {
		try {
			return await User.findById(userId)
				.populate("address")
				.exec();

		} catch (error) {
			throw new Error(error.message);
		}
	},


	updateUser: async (user, newUserData) => {
		try {
			user.name = newUserData.name;
			user.email = newUserData.email;
			user.birthDate = newUserData.birthDate;
			await user.save();

		} catch (error) {
			throw new Error(error.message);
		}
	},

	updateAddress: async (addressId, newAddressData) => {
		try {
			let userAddress = await Address.findById(addressId);
			userAddress.street = newAddressData.street;
			userAddress.state = newAddressData.state;
			userAddress.city = newAddressData.city;
			userAddress.country = newAddressData.country;
			userAddress.zip = newAddressData.zip;
			await userAddress.save();

		} catch (error) {
			throw new Error(error.message);
		}
	},

	deleteAddress: async (addressId) => {
		try {
			const address = await Address.findById(addressId);
			await address.remove();

		} catch (error) {
			throw new Error(error.message);
		}
	}
};