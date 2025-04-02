const mongoose = require('mongoose');
const User = require('./models/User.js');
require('dotenv').config();

mongoose.set('strictQuery', false);

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
		console.log('Connected to DB');
	} catch (error) {
		console.log("Couldn't connect to DB: ", error);
		process.exit(1);
	}
};

const makeAdmin = async (username) => {
	try {
		await connectDB();
		const user = await User.findOneAndUpdate({ username: username }, { $set: { isAdmin: true } }, { new: true });
		if (!user) {
			console.log('User not found');
			return;
		}
		console.log(`User ${username} updated to admin:`, user);
	} catch (error) {
		console.error('Error updating user:', error);
	} finally {
		mongoose.connection.close();
	}
};

// Reemplaza 'nebulax8' con tu nombre de usuario
makeAdmin('CarlosQuintero');
