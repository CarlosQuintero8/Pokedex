import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Route, Routes } from 'react-router-dom';
import Pokemons from './pages/Pokemons/Pokemons';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Admin from './pages/Admin/Admin';
import NotFound from './pages/Errors/NotFound';

function App() {
	return (
		<Routes>
			<Route path="/pokemons" element={<Pokemons />} />
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
