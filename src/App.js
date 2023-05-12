import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

// COMPONENTS
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import ProfilePage from './Components/Profile/ProfilePage';
import Explore from './Components/Explore/Explore';
import Notifications from './Components/Notifications/Notifications';
import Messages from './Components/Messages/Messages';
import Bookmarks from './Components/Bookmarks/Bookmarks';
import Lists from './Components/Lists/Lists';
import Settings from './Components/Settings/Settings';

function App() {
	return (
		<Routes>
			<Route path="/home" element={<Home />} />
			<Route path="/auth" element={<Auth />} />
			<Route path="/explore" element={<Explore />} />
			<Route path="/notifications" element={<Notifications />} />
			<Route path="/messages" element={<Messages />} />
			<Route path="/bookmarks" element={<Bookmarks />} />
			<Route path="/lists" element={<Lists />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/settings" element={<Settings />} />
		</Routes>
	);
}

export default App;
