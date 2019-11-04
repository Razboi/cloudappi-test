const errors = require("../utils/errors");
const usersService = require("../services/users");

module.exports = {

	getUsers: async (req, res, next) => {
		const users = await usersService.getAllUsers();
		res.send(users);
	},

	createUsers: async (req, res, next) => {
		const requestUser = req.body.user;

		if (!requestUser) {
			return next(errors.invalidInput());
		}
		const requestAddress = requestUser.address;
		try {
			const persistedAddress = await usersService.createNewAddress(requestAddress);
			let persistedUser = await usersService.createNewUser(requestUser, persistedAddress._id);

			persistedUser.address = persistedAddress;
			res.status(201);
			res.send(persistedUser);

		} catch (error) {
			console.log(error);
			return next(errors.invalidInput());
		}
	},

	getUsersById: async (req, res, next) => {
		if (!req.params.userId) {
			return next(errors.invalidUserId());
		}
		let user;
		try {
			user = await usersService.findUserById(req.params.userId);
		} catch (error) {
			return next(errors.invalidUserId());
		}
		if (!user) {
			return next(errors.userNotFound());
		}
		res.send(user);
	},

	updateUsersById: async (req, res, next) => {
		const newUserData = req.body.user;
		if (!req.params.userId) {
			return next(errors.invalidUserId());
		}
		try {
			let user = await usersService.findUserById(req.params.userId);

			if (!user) {
				return next(errors.userNotFound());
			}
			if (newUserData) {
				await usersService.updateUser(user, newUserData);
				if (newUserData.address) {
					await usersService.updateAddress(user.address, newUserData.address);
					user.address = newUserData.address;
				}
			}
			res.send(user);

		} catch (error) {
			console.log(error);
			return next(errors.invalidUserId());
		}
	},

	deleteUsersById: async (req, res, next) => {
		if (!req.params.userId) {
			return next(errors.invalidUserId());
		}
		try {
			let user = await usersService.findUserById(req.params.userId);
			if (!user) {
				return next(errors.userNotFound());
			}
			if (user.address) {
				await usersService.deleteAddress(user.address);
			}
			await user.remove();
			res.sendStatus(200);

		} catch (error) {
			return next(errors.invalidUserId());
		}
	}
};