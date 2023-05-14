import React, { useContext } from 'react';
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

// USER CONTEXT
import { UserContext } from './contexts/UserContext';

function App() {
	const { currentUser } = useContext(UserContext);

	return (
		<Routes>
			{currentUser ? (
				<>
					<Route path="/home" element={<Home />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/notifications" element={<Notifications />} />
					<Route path="/messages" element={<Messages />} />
					<Route path="/bookmarks" element={<Bookmarks />} />
					<Route path="/lists" element={<Lists />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/settings" element={<Settings />} />
				</>
			) : (
				<Route index path="/" element={<Auth />} />
			)}
		</Routes>
	);
}

export default App;
