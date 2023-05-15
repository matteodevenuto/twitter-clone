import { useState, useContext, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

import './ProfilePage.css';

import Sidebar from '../Sidebar/Sidebar';
import Profile from './Profile';
import Widgets from '../Widgets/Widgets';

import { UserContext } from '../../contexts/UserContext';

function ProfilePage() {
	const { currentUser } = useContext(UserContext);

	const [userData, setUserData] = useState();
	useEffect(() => {
		const getCurrentUser = async () => {
			const userDocRef = doc(db, 'users', currentUser);
			const userSnapshot = await getDoc(userDocRef);
			if (userSnapshot.exists()) {
				setUserData(userSnapshot.data());
			}
		};

		getCurrentUser();
	}, [currentUser]);

	return (
		<div className="app">
			<div className="profilePage__left">
				<Sidebar />
			</div>
			<div className="profilePage__middle">
				<Profile
					username={userData?.username}
					name={userData?.displayName}
					bio={userData?.bio}
					followerCount="96"
					followingCount="620"
					tweetCount="667"
					location={userData?.location}
					link={userData?.url}
					verified={userData?.verified}
					avatar={userData?.avatar}
					banner={userData?.banner}
					userId={currentUser}
				/>
			</div>
			<div className="profilePage__right">
				<Widgets />
			</div>
		</div>
	);
}

export default ProfilePage;
