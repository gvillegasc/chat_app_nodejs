const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {
	userConnected,
	userDiconnected,
} = require('../controllers/socket.controller');

// Mensajes de Sockets
io.on('connection', (client) => {
	console.log('Cliente conectado');
	const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

	// Validate authentication
	if (!valid) {
		console.log('Cliente invalido');

		return client.disconnect();
	}

	console.log('Cliente validado');

	// Change authentication state
	userConnected(uid);
	console.log('Cliente actualizado');

	client.on('disconnect', () => {
		userDiconnected(uid);
	});

	// client.on('mensaje', (payload) => {
	// console.log('Mensaje', payload);
	// io.emit('mensaje', { admin: 'Nuevo mensaje' });
	// });
});
