/* User actions */

export const updateFname = fname => ({
	type: 'UPDATE_FNAME',
	fname
});

export const updateLname = lname => ({
	type: 'UPDATE_LNAME',
	lname
});

export const updateNickname = nickname => ({
	type: 'UPDATE_NICKNAME',
	nickname
});

export const updateGender = gender => ({
	type: 'UPDATE_GENDER',
	gender
});

export const updateTags = tags => ({
	type: 'UPDATE_TAGS',
	tags
});

export const updatePhotos = photos => ({			
		type: 'UPDATE_PHOTOS',
		photos: photos.map(photo => (photo === null ? undefined : photo))
});

export const updateOrientation = orientation => ({
	type: 'UPDATE_ORIENTATION',
	orientation
});

export const updateBirthDate = birthDate => ({
	type: 'UPDATE_BIRTHDATE',
	birthDate
});

export const updateLocation = location => ({
	type: 'UPDATE_LOCATION',
	location
});
