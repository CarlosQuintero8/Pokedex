// pages/Errors/NotFound.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';

function NotFound() {
	return (
		<div className="container text-center mt-5">
			<h1 className="display-1">404</h1>
			<h2>Pokémon No Encontrado</h2>
			<div className="error-image-container">
				<img
					src="/error-404.jpg"
					alt="Custom 404 Error"
					className="img-fluid error-image"
					style={{ maxWidth: '500px' }}
				/>
			</div>
			<p className="mt-3">Lo sentimos, parece que este Pokémon se ha escapado o la página no existe.</p>
			<a href="/" className="btn btn-primary mt-3">
				Volver al Inicio
			</a>
		</div>
	);
}

export default NotFound;
