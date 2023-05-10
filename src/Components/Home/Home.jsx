import React from 'react';

// COMPONENTS
import Sidebar from '../Sidebar/Sidebar';
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';
import './Home.css';

function Home() {
	return (
		<div className="app">
			<Sidebar />
			<Feed />
			<Widgets />
		</div>
	);
}

export default Home;
