import React from 'react';

import './Home.css';

// COMPONENTS
import Sidebar from '../Sidebar/Sidebar';
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';

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
