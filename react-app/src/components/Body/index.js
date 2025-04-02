import React, { useEffect } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import axios from '../../api/axios';

function Body({ pokemons, setCurrentPoke, setShowModal, favorites, setFavorites }) {
	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const res = await axios.get('/favorites', { withCredentials: true });

				const favs = res.data === undefined ? [] : res.data;
				setFavorites(favs);
			} catch (error) {
				console.error('Error fetching favorites:', error);
				setFavorites([]);
			}
		};
		fetchFavorites();
	}, [setFavorites]);

	const getImgUrl = (id) => {
		let newId = '0'.repeat(3 - id.length) + id;
		if (newId === '662') newId += 'r';
		if (newId === '740') newId += 'le';
		return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${newId}.png`;
	};

	const handleExpandPoke = (item) => {
		setCurrentPoke({ ...item, img: getImgUrl(String(item.id)) });
		setShowModal(true);
	};

	const toggleFavorite = async (e, id) => {
		e.stopPropagation();
		console.log(id);
		if (favorites.includes(id)) {
			setFavorites(favorites.filter((item) => item !== id));
			await axios.patch('removeFavorite/' + id, {}, { withCredentials: true });
		} else {
			console.log('adding favorite');
			setFavorites([...favorites, id]);
			await axios.patch('addFavorite/' + id, {}, { withCredentials: true });
		}
	};

	// Función para obtener la clase del tipo principal
	const getTypeClass = (types) => {
		if (!types || types.length === 0) return 'type-bg--normal type-border--normal';
		const primaryType = types[0].toLowerCase();
		return `type-bg--${primaryType} type-border--${primaryType}`;
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
			{pokemons.map((item, index) => (
				<div
					key={index}
					onClick={() => handleExpandPoke(item)}
					className={`relative rounded-lg shadow-lg overflow-hidden cursor-pointer border-4 hover:scale-105 transition-transform ${getTypeClass(
						item.type,
					)}`}
				>
					<img
						className="w-full h-48 object-contain bg-white p-4"
						alt={item.name.english}
						src={getImgUrl(String(item.id))}
					/>
					<div className="flex items-center justify-between p-4 bg-opacity-80 bg-gray-900 text-white">
						{favorites.includes(item.id) ? (
							<FaStar
								size={17}
								onClick={(e) => toggleFavorite(e, item.id)}
								className="text-yellow-400 hover:text-yellow-500 transition-colors"
							/>
						) : (
							<FaRegStar
								size={17}
								onClick={(e) => toggleFavorite(e, item.id)}
								className="text-yellow-400 hover:text-yellow-500 transition-colors"
							/>
						)}
						<p className="text-sm font-semibold">
							#{item.id} {item.name.english}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

export default Body;
