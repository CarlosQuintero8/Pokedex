const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
require('express-async-errors');
const moment = require('moment');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
app.enable('trust proxy');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_STRING);
		console.log(`Connected to DB`);
	} catch (error) {
		console.log("Couldn't connect to DB: ", error);
		process.exit(1);
	}
};

const { DatabaseError, AuthError, PokemonNoSuchRouteError, BadRequest } = require('./errors.js');

// Import models
const User = require('./models/User.js');
const Request = require('./models/Request.js');
const Error = require('./models/Error.js');

// Middleware
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
	uri: process.env.DB_STRING,
	collection: 'sessions',
});

store.on('error', function (error) {
	console.error('Session store error:', error);
});

app.use('/', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'https://pokedex-salesp07.netlify.app');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

const whitelist = [
	'http://localhost:3000',
	'https://tu-nuevo-proyecto.netlify.app', // Mi URL de Netlify
];
app.use(
	cors({
		origin: (origin, callback) => {
			// Permitir solicitudes sin origen (como Postman) o si el origen está en la whitelist
			if (!origin || whitelist.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true, // Necesario para enviar cookies/sesiones
		methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);

app.use(
	session({
		name: 'sessionID',
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 600000, // 10 minutos
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production', // true en producción
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' para cross-site
		},
		store: store,
	}),
);

function isLoggedIn(req, res, next) {
	if (req.session.isLoggedIn) {
		return next();
	}
	return res.json({ errMsg: 'Not logged in' });
}

function isAdmin(req, res, next) {
	if (req.session.user.isAdmin) {
		return next();
	}
	return res.json({ errMsg: 'Not an admin' });
}

async function logRequest(req, res, next) {
	await Request.create({
		username: req.session.user?.username || 'Guest',
		endpoint: `${req.originalUrl}[${req.method}]`,
	});
	next();
}

// Error handler

async function handleErr(err, req, res, next) {
	if (err.name === 'MongoServerError' || err.name === 'MongoError') {
		err = new DatabaseError(err.message);
	}
	await Error.create({
		username: req.session?.user?.username || 'default',
		name: err.name,
		endpoint: `${req.originalUrl}[${req.method}]`,
		code: err.code || 500,
	});
	console.log(err.message);
	return res.json({ errMsg: err.message });
}

// Routes

app.get('/logout', (req, res) => {
	req.session.destroy();
	return res.json({ redirect: '/' });
});

app.post('/register', async (req, res) => {
	const { username, password } = req.body;
	const userExists = await User.findOne({ username: username });
	if (userExists) throw new AuthError('Username not available');
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const userWithHashedPassword = { username: username, password: hashedPassword };
	console.log(userWithHashedPassword);
	const user = await User.create(userWithHashedPassword);
	req.session.user = {
		username: user.username,
		isAdmin: user.isAdmin || false,
	};
	req.session.isLoggedIn = true;
	console.log('Session after register:', req.session);
	req.session.save((err) => {
		if (err) {
			console.error('Error saving session in /register:', err);
			return res.status(500).json({ errMsg: 'Error saving session' });
		}
		return res.json({ redirect: '/' });
	});
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	let user = await User.findOne({ username: username });
	if (!user) throw new AuthError('Incorrect username or password');
	const comp = await bcrypt.compare(password, user.password);
	if (!comp) throw new AuthError('Incorrect username or password');
	req.session.user = {
		username: user.username,
		isAdmin: user.isAdmin || false,
	};
	req.session.isLoggedIn = true;
	console.log('Session after login:', req.session);
	req.session.save((err) => {
		if (err) {
			console.error('Error saving session in /login:', err);
			return res.status(500).json({ errMsg: 'Error saving session' });
		}
		user.isAdmin ? res.json({ redirect: '/admin' }) : res.json({ redirect: '/pokemons' });
	});
});

app.get('/getSessionInfo', (req, res) => {
	console.log('Session data:', req.session); // Para depuración
	res.json({
		isLoggedIn: req.session.isLoggedIn || false,
		isAdmin: req.session.user?.isAdmin || false,
		username: req.session.user?.username || 'Guest', // Incluimos el username
	});
});

app.get('/pokemons', isLoggedIn, logRequest, async (req, res) => {
	let remoteTypes = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json');
	remoteTypes = remoteTypes.data.map((item) => item.english);
	let remotePokes = await axios.get(`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json`);
	remotePokes = remotePokes.data;
	res.json({ pokemons: remotePokes, types: remoteTypes });
});

app.get('/topUsers', isLoggedIn, isAdmin, async (req, res) => {
	const data = await Request.aggregate().sortByCount('username').limit(10);
	res.json(data);
});

app.get('/topUsers/:endpoint', isLoggedIn, isAdmin, async (req, res) => {
	possibleEndpoints = ['GET', 'POST', 'PATCH', 'DELETE'];
	if (!possibleEndpoints.includes(req.params.endpoint)) throw new BadRequest('Invalid endpoint');
	const endpoint = `/pokemon[${req.params.endpoint}]`;
	const data = await Request.aggregate([{ $match: { endpoint: endpoint } }])
		.sortByCount('username')
		.limit(10);
	res.json(data);
});

app.get('/uniqueUsers/:currentHour', isLoggedIn, isAdmin, async (req, res) => {
	let currentHour = Number(req.params.currentHour);
	let hoursArray = [];

	// Generate the first array
	for (let i = 5; i >= 0; i--) {
		let hour = currentHour - i;
		if (hour < 0) hour += 24;
		let obj = {
			_id: hour,
			count: 0,
		};
		hoursArray.push(obj);
	}

	const query = await Request.aggregate([
		{
			$match: {
				createdAt: {
					$gte: new Date(Date.now() - 6 * 60 * 60 * 1000),
				},
			},
		},
		{
			$project: {
				createdAtVancouver: {
					$subtract: ['$createdAt', 7 * 60 * 60 * 1000],
				},
				username: 1,
			},
		},
		{
			$group: {
				_id: { username: '$username', hour: { $hour: '$createdAtVancouver' } },
			},
		},
		{
			$group: {
				_id: '$_id.hour',
				count: { $sum: 1 },
			},
		},
	]);

	// Merge the two arrays with priority given to mongoose aggregate array
	let resultArray = hoursArray.reduce((acc, curr) => {
		let matchingObj = query.find((obj) => obj._id === curr._id);
		if (matchingObj) newItem = matchingObj;
		else newItem = curr;
		newItem['_id'] = moment(newItem['_id'], 'H').format('hA');
		acc.push(newItem);
		return acc;
	}, []);
	res.json(resultArray);
});

app.get('/recentErrors', isLoggedIn, isAdmin, async (req, res) => {
	const data = await Error.find().sort({ createdAt: -1 }).limit(10);
	res.json(data);
});

app.get('/errorsByEndpoint', isLoggedIn, isAdmin, async (req, res) => {
	const data = await Error.aggregate().sortByCount('endpoint').limit(5);
	res.json(data);
});

app.patch('/addFavorite/:id', isLoggedIn, async (req, res) => {
	const id = Number(req.params.id);
	if (id === undefined || typeof id !== 'number' || (id < 1 && id > 809)) throw new BadRequest('Invalid id');
	const newUser = await User.findOneAndUpdate(
		{ username: req.session.user?.username || 'Guest' },
		{ $addToSet: { favorites: id } },
		{ new: true },
	);
	console.log(newUser);
	res.json({ message: 'Added to favorites' });
});

app.patch('/removeFavorite/:id', isLoggedIn, async (req, res) => {
	const id = Number(req.params.id);
	if (id === undefined || typeof id !== 'number' || (id < 1 && id > 809)) throw new BadRequest('Invalid id');
	await User.findOneAndUpdate({ username: req.session.user?.username || 'Guest' }, { $pull: { favorites: id } });
	res.json({ message: 'Removed from favorites' });
});

app.get('/favorites', isLoggedIn, async (req, res) => {
	const user = await User.findOne({ username: req.session.user?.username || 'Guest' });
	res.json(user.favorites);
});

app.get('*', (req, res) => {
	throw new PokemonNoSuchRouteError();
});

app.use(handleErr);

connectDB()
	.then(() => {
		const server = app.listen(process.env.PORT, '127.0.0.1', () => {
			console.log('Server started on port ' + process.env.PORT);
		});
		server.on('error', (err) => {
			console.error('Error al iniciar el servidor:', err);
		});
	})
	.catch((err) => {
		console.error('Error al conectar a la DB:', err);
	});
