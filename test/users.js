const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const Address = require("../src/models/Address");
const User = require("../src/models/User");
const should = chai.should();

chai.use( chaiHttp );
mongoose.connect( "mongodb://localhost:27017/cloudappi", { useNewUrlParser: true }).then(() => {
	console.log( "MongoDB connected" );
}).catch( err => console.log( err ));

describe( "POST users/createUsers", function() {

	after( async function() {
		await Address.findByIdAndRemove(this.createdUser.address._id);
		await User.findByIdAndRemove(this.createdUser._id);
	});

	it( "creates a new user, should return 201", function( done ) {
		chai.request( "localhost:3000" )
			.post( "/users/createUsers" )
			.send({
				user: {
					name: "User",
					email: "test@test.com",
					birthDate: "21/10/1992",
					address: {
						street: "baker street 123",
						state: "Castellón",
						city: "Castellón",
						country: "Spain",
						zip: 12003
					}
				}
			})
			.end(( err, res ) => {
				res.should.have.status( 201 );
				this.createdUser = JSON.parse(res.text);
				done();
			});
	});

	it( "no user data, should return 405 invalid input", function( done ) {
		chai.request( "localhost:3000" )
			.post( "/users/createUsers" )
			.end(( err, res ) => {
				res.should.have.status( 405 );
				done();
			});
	});
});

describe( "GET users/getusers", function() {

	it( "gets all the users, should return 200", function( done ) {
		chai.request( "localhost:3000" )
			.get( "/users/getusers" )
			.end(( err, res ) => {
				res.should.have.status( 200 );
				done();
			});
	});
});

describe( "GET users/getusersById/:userId", function() {

	before( async function() {
		this.testAddress = await new Address({
			street: "baker street 123",
			state: "Castellón",
			city: "Castellón",
			country: "Spain",
			zip: 12003
		}).save();
		this.testUser = await new User({
			name: "Updated User",
			email: "test2@test.com",
			birthDate: "21/10/1992",
			address: this.testAddress._id
		}).save();
	});

	after( async function() {
		await Address.findByIdAndRemove(this.testAddress._id);
		await User.findByIdAndRemove(this.testUser._id);
	});

	it( "gets a user by id, should return 200", function( done ) {
		chai.request( "localhost:3000" )
			.get( `/users/getusersById/${this.testUser._id}` )
			.end(( err, res ) => {
				res.should.have.status( 200 );
				done();
			});
	});

	it( "gets a user using an invalid id, should return 400 invalid user id", function( done ) {
		chai.request( "localhost:3000" )
			.get( "/users/getusersById/123" )
			.end(( err, res ) => {
				res.should.have.status( 400 );
				done();
			});
	});

	it( "gets a user using a non existing id, should return 404 user not found", function( done ) {
		chai.request( "localhost:3000" )
			.get( "/users/getusersById/5dbf70acd61b256fdec9ec75" )
			.end(( err, res ) => {
				res.should.have.status( 404 );
				console.log(this.testUserId);
				done();
			});
	});
});

describe( "PUT users/updateUsersById/:userId", function() {

	before( async function() {
		this.testAddress = await new Address({
			street: "baker street 123",
			state: "Castellón",
			city: "Castellón",
			country: "Spain",
			zip: 12003
		}).save();
		this.testUser = await new User({
			name: "Updated User",
			email: "test2@test.com",
			birthDate: "21/10/1992",
			address: this.testAddress._id
		}).save();
	});

	after( async function() {
		await Address.findByIdAndRemove(this.testAddress._id);
		await User.findByIdAndRemove(this.testUser._id);
	});

	it( "updates a user using an invalid id, should return 400 invalid user id", function( done ) {
		chai.request( "localhost:3000" )
			.put( "/users/updateUsersById/123" )
			.end(( err, res ) => {
				res.should.have.status( 400 );
				done();
			});
	});

	it( "updates a user using a non existing id, should return 404 user not found", function( done ) {
		chai.request( "localhost:3000" )
			.put( "/users/updateUsersById/5dbf70acd61b256fdec9ec75" )
			.end(( err, res ) => {
				res.should.have.status( 404 );
				done();
			});
	});

	it( "updates a user without passing the data, should return 200", function( done ) {
		chai.request( "localhost:3000" )
			.put( `/users/updateUsersById/${this.testUser._id}` )
			.end(( err, res ) => {
				res.should.have.status( 200 );
				done();
			});
	});

	it( "updates a user by id, should return 200", function( done ) {
		chai.request( "localhost:3000" )
			.put( `/users/updateUsersById/${this.testUser._id}` )
			.send({
				user: {
					name: "Updated User",
					email: "test2@test.com",
					birthDate: "21/10/1992",
					address: {
						street: "baker street 123",
						state: "Castellón",
						city: "Castellón",
						country: "Spain",
						zip: 12003
					}
				}
			})
			.end(( err, res ) => {
				res.should.have.status( 200 );
				done();
			});
	});
});

describe( "DELETE users/deleteUsersById/:userId", function() {

	before( async function() {
		this.testAddress = await new Address({
			street: "baker street 123",
			state: "Castellón",
			city: "Castellón",
			country: "Spain",
			zip: 12003
		}).save();
		this.testUser = await new User({
			name: "Updated User",
			email: "test2@test.com",
			birthDate: "21/10/1992",
			address: this.testAddress._id
		}).save();
	});

	after( async function() {
		await Address.findByIdAndRemove(this.testAddress._id);
		await User.findByIdAndRemove(this.testUser._id);
	});

	it( "deletes a user using an invalid id, should return 400 invalid user id", function( done ) {
		chai.request( "localhost:3000" )
			.delete( "/users/deleteUsersById/123" )
			.end(( err, res ) => {
				res.should.have.status( 400 );
				done();
			});
	});

	it( "deletes a user using a non existing id, should return 404 user not found", function( done ) {
		chai.request( "localhost:3000" )
			.put( "/users/deleteUsersById/flaalsj2313ldafj5l" )
			.end(( err, res ) => {
				res.should.have.status( 404 );
				done();
			});
	});

	it( "deletes a user by id, should return 200", function( done ) {
		chai.request( "localhost:3000" )
			.delete( `/users/deleteUsersById/${this.testUser._id}` )
			.end(( err, res ) => {
				res.should.have.status( 200 );
				done();
			});
	});
});