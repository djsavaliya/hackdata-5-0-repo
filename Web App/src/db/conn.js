const mongoose = require('mongoose');
const db = mongoose.connection;

// DB connection
mongoose
	.connect(process.env.DB_URI, {
		dbName: process.env.DB_NAME,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Connection estabislished with MongoDB');
	})
	.catch((error) => console.error(error.message));

//Connection Handlers
db.on('error', () => {
	console.log('Error occurred from the database');
});

db.once('open', () => {
	console.log('Successfully accessed the database');
});

module.exports = mongoose;