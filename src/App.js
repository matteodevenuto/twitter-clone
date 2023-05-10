import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// COMPONENTS
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
