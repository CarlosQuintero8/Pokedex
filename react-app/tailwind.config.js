/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				// Normal
				'type-normal': 'linear-gradient(181.51deg, #735259 -6.44%, #BC6B7C 121.95%, #7C3F4C 186.11%)',
				// Fighting
				'type-fighting': 'linear-gradient(176.83deg, #96402A -8.78%, #F1613C 169.09%, #CB735D 242.33%)',
				// Flying
				'type-flying': 'linear-gradient(177.03deg, #3A75BB -11.97%, #82A4E3 57.49%, #B0C8FF 135.64%)',
				// Poison
				'type-poison': 'linear-gradient(177.03deg, #5B3184 -11.97%, #A564E3 71.28%, #CE9BFF 135.64%)',
				// Ground
				'type-ground': 'linear-gradient(179.75deg, #654008 -19.96%, #895C1A 43.67%, #D69638 138.4%)',
				// Rock
				'type-rock': 'linear-gradient(177.03deg, #7E7E7E -11.97%, #8D8D94 57.49%, #D3D3D3 135.64%)',
				// Bug
				'type-bug': 'linear-gradient(177.56deg, #62DB60 -58.92%, #3BB039 16.57%, #AAFFA8 209.53%)',
				// Ghost
				'type-ghost': 'linear-gradient(177.03deg, #323569 -11.97%, #454AA8 57.49%, #787DDA 135.64%)',
				// Steel
				'type-steel': 'linear-gradient(179.75deg, #5E736C -19.96%, #728881 43.67%, #A8A8A8 138.4%)',
				// Fire
				'type-fire': 'linear-gradient(176.37deg, #F96D6F -32.26%, #E35825 22.55%, #E8AE1B 125.72%)',
				// Water
				'type-water': 'linear-gradient(179.57deg, #133258 -70.14%, #1479FB 56.16%, #82B2F1 214.85%)',
				// Grass
				'type-grass': 'linear-gradient(178.92deg, #7EC6C5 0.92%, #ABDAC6 47.96%, #CAE099 99.08%)',
				// Electric
				'type-electric': 'linear-gradient(179.75deg, #0C1395 -19.96%, #2B319B 43.67%, #7075D9 138.4%)',
				// Psychic
				'type-psychic': 'linear-gradient(177.03deg, #E75480 -11.97%, #F78DA7 57.49%, #FFC1CC 135.64%)',
				// Ice
				'type-ice': 'linear-gradient(177.03deg, #6FBEDF -11.97%, #64CBF5 47.77%, #BDEBFE 136.72%)',
				// Dragon
				'type-dragon': 'linear-gradient(179.75deg, #478A93 -19.96%, #56A4AE 43.67%, #A2BEC1 138.4%)',
				// Dark
				'type-dark': 'linear-gradient(177.03deg, #030706 -11.97%, #0D1211 57.49%, #5A5E5D 135.64%)',
				// Fairy
				'type-fairy': 'linear-gradient(179.75deg, #971B45 -19.96%, #C23867 43.67%, #CD7D98 138.4%)',
				// Stellar
				'type-stellar': 'linear-gradient(177.03deg, #4B0082 -11.97%, #8A2BE2 57.49%, #DDA0DD 135.64%)',
				// Unknown
				'type-unknown': 'linear-gradient(177.03deg, #696969 -11.97%, #A9A9A9 57.49%, #D3D3D3 135.64%)',
				// Shadow
				'type-shadow': 'linear-gradient(177.03deg, #2F4F4F -11.97%, #556B2F 57.49%, #8FBC8F 135.64%)',
			},
		},
	},
	plugins: [],
};
