import React from 'react';
import UserPhotos from '../photo/UserPhotos';

export default class OnboardingPhoto extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			startGetPhotosUrl: false
		};
	}

	startGetPhotosUrl = () => {
		this.setState({ startGetPhotosUrl: true }, 
				() => this.setState({ startGetPhotosUrl: false }));
	};

	getPhoto = (photosUrl) => {
		console.log('Photo Urls in OnboardingPhoto', photosUrl);	
	};

	render () {
		const { initialPhotos } = this.props;
				
			
		return (
			<div>	
				<UserPhotos 
					initialPhotos={initialPhotos} 
					getPhotosUrl={this.getPhoto}
					shouldStartGetPhotosUrl={this.state.startGetPhotosUrl}
				/>	
				
				<button onClick={this.startGetPhotosUrl}>Continue</button>
			</div>
		);
	}
}

