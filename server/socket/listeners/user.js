const registration = require('../../actions/user/registration');
const passwordResetEmail = require('../../actions/user/passwordResetMail');
const passwordReset = require('../../actions/user/passwordReset');
const logger = require('../../logs/logger');
const login = require('../../actions/authentication/login');

const userListeners = (socket) => {
	socket.on('createUser', async (user) => {
		logger.info('Create User Listener running...');
		const response = await registration(user);
		if (response.error) {
			response.error.forEach((error) => {
				socket.emit('notificationError', error);
			});
		} else {
			socket.emit('notificationSuccess', 'Account successfully created !');
			socket.emit('createUser');
			logger.succes('User registration');

			user.emailOrLogin = user.email;
			logger.info(`Login user with: ${JSON.stringify(user)}`);
			const response = await login(user);
			if (response.error) {
				response.error.forEach((error) => {
					socket.emit('notificationError', error);
				});
			} else {
				socket.emit('login', response);
				logger.succes('Login user');
			}
		}
	});

	socket.on('passwordResetEmail', async (user) => {
		logger.info('Password Reset Email Listener running...');
		const response = await passwordResetEmail(user);
		if (response.error) {
			response.error.forEach((error) => {
				socket.emit('notificationError', error);
			});
		} else {
			socket.emit('passwordResetEmail', response);
			socket.emit('notificationInfo', 'Please check your inbox.');
			logger.succes('Password Reset email on his way...');
		}
	});

	socket.on('passwordReset', async (user) => {
		logger.info('Password Reset Listener running...');
		const response = await passwordReset(user);
		if (response.error) {
			response.error.forEach((error) => {
				socket.emit('notificationError', error);
			});
		} else {
			socket.emit('passwordReset', {});
			socket.emit('notification_success', 'Password reset successful, you can now login !');
			logger.succes('Password reset');
		}
	});
};

module.exports = userListeners;
