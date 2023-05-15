import React from 'react';
import './Home.css';

import Sidebar from '../Sidebar/Sidebar';
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';

function Home() {
	return (
		<div className="app">
			<div className="home_left">
				<Sidebar />
			</div>
			<div className="home_middle">
				<Feed />
			</div>
			<div className="home_right">
				<Widgets />
			</div>
		</div>
	);
}

export default Home;
