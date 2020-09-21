const express = require('express');
const path = require('path');
require('dotenv').config();

// DB CONFIG
const { dbConnection } = require('./database/config');
dbConnection();

// EXPRESS APP
const app = express();

// BODYPARSER CONFIG
app.use(express.json());

// NODE SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// PUBLIC PATH
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// ROUTES IMPORT
const authRoute = require('./routes/auth.route');

// USING ROUTES
app.use('/api/auth', authRoute);

server.listen(process.env.PORT, (err) => {
	if (err) throw new Error(err);

	console.log('Servidor corriendo en puerto', process.env.PORT);
});
