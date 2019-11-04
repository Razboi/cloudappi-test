const express = require("express");
const app = express();
const port = 3000;
const users = require("./routes/users");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect( "mongodb://localhost:27017/cloudappi", { useNewUrlParser: true }).then(() => {
	console.log( "MongoDB connected" );
}).catch( err => console.log( err ));

app.use( bodyParser.json());
app.use("/users", users);

// error middleware
app.use(( err, req, res, next ) => {
	console.log( err );
	if ( !err.statusCode ) {
		res.status( 500 );
	} else {
		res.status( err.statusCode );
	}
	res.send( err.message );
});

app.listen(port, () => console.log("Listening on port " + port));