import React from 'react';

// COMPONENTS
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Widgets from './Components/Widgets';
import './App.css';

function App() {
	return (
		<div className="app">
			<Sidebar />
			<Feed />
			<Widgets />
		</div>
	);
}

export default App;
