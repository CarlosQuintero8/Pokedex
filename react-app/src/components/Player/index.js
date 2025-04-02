// components/Player.js
import AudioPlayer from 'react-modern-audio-player';
import { useState, useEffect } from 'react';

const playList = [
	{
		name: 'Littleroot Town',
		writer: '(R/S/E)',
		img: '/logo2.png',
		src: '/littleroot_town.mp3',
		id: 1,
	},
	{
		name: 'Oldale Town',
		writer: '(R/S/E)',
		img: '/logo2.png',
		src: '/oldale_town.mp3',
		id: 2,
	},
	{
		name: 'Ending',
		writer: '(D/P/Pt)',
		img: '/logo2.png',
		src: '/ending.mp3',
		id: 3,
	},
	{
		name: "Don't ever forget",
		writer: 'Pokémon Mystery Dungeon',
		img: '/logo2.png',
		src: '/dont_ever_forget.mp3',
		id: 4,
	},
	{
		name: 'Emotion',
		writer: 'Pokémon Black/White',
		img: '/logo2.png',
		src: '/emotion.mp3',
		id: 5,
	},
	{
		name: 'Pokemon Theme Song',
		writer: 'Jason Paige',
		img: '/logo2.png',
		src: '/pokemon_theme.mp3',
		id: 6,
	},
	{
		name: 'Pokemon World',
		writer: 'Anime Allstars',
		img: '/logo2.png',
		src: '/pokemon_world.mp3',
		id: 7,
	},
];

const mobileUI = {
	all: false,
	playButton: true,
	playList: true,
	prevNnext: true,
	volume: true,
	volumeSlider: true,
	repeatType: false,
	trackTime: false,
	trackInfo: false,
	artwork: false,
	progress: false,
};

function Player() {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResizeWindow = () => setScreenWidth(window.innerWidth);
		window.addEventListener('resize', handleResizeWindow);
		return () => {
			window.removeEventListener('resize', handleResizeWindow);
		};
	}, []);

	return (
		<AudioPlayer
			playList={playList}
			activeUI={
				screenWidth < 800
					? mobileUI
					: {
							all: true,
							progress: 'bar',
					  }
			}
			style={{
				backgroundColor: '#333333',
				color: '#E0E0E0',
				'--rhap-theme-color': '#007BFF',
				'--rhap-progress-filled': '#007BFF',
				'--rhap-progress-buffered': '#666666',
				'--rhap-time-color': '#E0E0E0',
				'--rhap-track-info-color': '#E0E0E0',
				'--rhap-button-color': '#E0E0E0',
				'--rhap-button-hover-color': '#FFFFFF',
			}}
		/>
	);
}

export default Player;
