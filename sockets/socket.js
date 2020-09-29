const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {
	userConnected,
	userDiconnected,
	saveMessage,
} = require('../controllers/socket.controller');

// Mensajes de Sockets
io.on('connection', (client) => {
	const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

	// Validate authentication
	if (!valid) {
		return client.disconnect();
	}

	// Change authentication state
	userConnected(uid);

	// Access in global room
	client.join(uid);

	// Listening
	client.on('personal-message', async (payload) => {
		await saveMessage(payload);
		io.to(payload.from).emit('personal-message', payload);
	});

	// client.to(uid).emit('');

	client.on('disconnect', () => {
		userDiconnected(uid);
	});

	// client.on('mensaje', (payload) => {
	// console.log('Mensaje', payload);
	// io.emit('mensaje', { admin: 'Nuevo mensaje' });
	// });
});
