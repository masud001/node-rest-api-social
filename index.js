const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./router/users');
const authRoute = require('./router/auth');

dotenv.config();

const app = express();

// mongo connection
const options = {
	autoIndex: false, // Don't build indexes
	maxPoolSize: 10, // Maintain up to 10 socket connections
	serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4, // Use IPv4, skip trying IPv6
};

mongoose.connect(process.env.MONGO_URL, options, (err) => {
	if (err) console.log(err);
	else console.log('mongodb is connected');
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(8080, () => {
	// console.log('the server is running in port 8080');
});
