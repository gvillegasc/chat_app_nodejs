const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');

// Mensajes de Sockets
io.on('connection', (client) => {
	console.log('Cliente conectado');
	const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

	if (!valid) {
		return client.disconnect();
	}
	console.log('client autenticado');

	client.on('disconnect', () => {
		console.log('Cliente desconectado');
	});

	// client.on('mensaje', (payload) => {
	// console.log('Mensaje', payload);
	// io.emit('mensaje', { admin: 'Nuevo mensaje' });
	// });
});
