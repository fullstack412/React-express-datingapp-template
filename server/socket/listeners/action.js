/* Default socket listner for Redux-Socket.io middleware */

const logger = require('../../logs/logger');
const getProfile = require('../../actions/onboarding/getProfile');
const getGender = require('../../actions/onboarding/getGender');
const getLocation = require('../../actions/onboarding/getLocation');
const getTags = require('../../actions/onboarding/getTags');
const getPhotos = require('../../actions/onboarding/getPhotos');
const getBio = require('../../actions/onboarding/getBio');
const getProfiles = require('../../actions/search/getProfiles');
const getProfilesCount = require('../../actions/search/getProfilesCount');
const editProfile = require('../../actions/edit/editProfile');
const addLike = require('../../actions/interactions/addLike');


const startAction = async (action, socket, actionFunc, loggerContent) => {
	action.data.socketID = socket.id;
	const response = await actionFunc(action.data);

	if (response.error) {
		socket.emit('notificationError', response.error[0]);
	} else {

		/* Send back either the initial data to client or the response output */	
		if (!!response.data) {
			logger.succes(`EMIT: ${action.type}`);
			socket.emit(action.type, response.data);
		} else {
			socket.emit(action.type, action.data);
		}


		/* Only if a response need to be broadcasted to one or many users ws */
		if (response.sockets) {
			console.log('target sockets ', response.sockets);	
		}	

		/* Only if a notification message need to be sent */
		switch (action.type) {
			case 'SERVER/SAVE_LOCATION': 
				socket.emit('notificationSuccess', 'Congratulations, welcome to Matcha !');
			case 'SERVER/EDIT_PROFILE': 
				socket.emit('notificationSuccess', 'Profile updated');
		}

		logger.succes(loggerContent);
	}
};


const actionListeners = (socket) => {
	socket.on('action', (action) => {

		switch (action.type) {
			
			/* Onboarding  */
			case 'SERVER/SAVE_PROFILE': /* lname, fname, nickname, birthdate */
				startAction(action, socket, getProfile, 'Onboarding: user profile data saved to DB');
				break; 
			case 'SERVER/SAVE_GENDER':
				startAction(action, socket, getGender, 'Onboarding: user gender data saved to DB');
				break; 
			case 'SERVER/SAVE_LOCATION': /* latitude, longitude, geolocationAllowed */
				startAction(action, socket, getLocation, 'Onboarding: user location data saved to DB');
				break; 
			case 'SERVER/SAVE_TAGS':
				startAction(action, socket, getTags, 'Onboarding: user tags saved to DB');
				break; 
			case 'SERVER/SAVE_PHOTOS':
				startAction(action, socket, getPhotos, 'Onboarding: user photos saved to DB');
				break; 
			case 'SERVER/SAVE_BIO': /* bio, occupation */ 
				startAction(action, socket, getBio, 'Onboarding: user bio and occupation saved to DB');
				break; 
			case 'SERVER/EDIT_PROFILE': 
				startAction(action, socket, editProfile, 'Onboarding: user bio and occupation saved to DB');
				break; 

			/* Search */
			case 'SERVER/GET_PROFILES':
				startAction(action, socket, getProfiles, 'Search: user profiles data fetched');
				break;
			case 'SERVER/GET_PROFILES_COUNT':
				startAction(action, socket, getProfilesCount, 'Search: user profiles count fetched');
				break;
 

			/* Interactions (likes & visits) */	
			case 'SERVER/ADD_LIKE':
				//	console.log('like : ', action);
				startAction(action, socket, addLike, 'Adding new like to db');
				break;
			case 'SERVER/ADD_VISIT':
				console.log('visit : ', action);
				//  startAction(action, socket, getProfiles, 'Search: user profiles data fetched');
				break;

				
			default: 
				return;
		}
	});
};

module.exports = actionListeners;
