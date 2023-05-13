import React, { useState, useContext, useEffect } from 'react';
import './TweetBox.css';
import { Avatar, Button } from '@mui/material';
import { UserContext } from '../../contexts/UserContext';
import { db } from '../../utils/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

function TweetBox() {
	const [tweetMessage, setTweetMessage] = useState('');
	const [tweetImage, setTweetImage] = useState('');

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

	const sendTweet = async (e) => {
		e.preventDefault();

		const userDocRef = doc(db, 'users', currentUser);
		const newPost = doc(collection(db, 'posts'));
		const data = {
			text: tweetMessage,
			image: tweetImage,
			userRef: userDocRef,
			timestamp: new Date(),
		};
		await setDoc(newPost, data);

		setTweetMessage('');
		setTweetImage('');
	};

	return (
		<div className="tweetBox">
			<form>
				<div className="tweetBox__input">
					<Avatar
						alt="Avatar"
						src={userData?.avatar}
						sx={{ width: 48, height: 48 }}
					/>
					<input
						onChange={(e) => setTweetMessage(e.target.value)}
						value={tweetMessage}
						placeholder="What's happening?"
						type="text"
					/>
				</div>
				<input
					value={tweetImage}
					onChange={(e) => setTweetImage(e.target.value)}
					className="tweetBox__imageInput"
					placeholder="Optional: Enter Image/GIF URL"
					type="text"
				/>

				<Button
					onClick={sendTweet}
					type="submit"
					className="tweetBox__tweetButton"
				>
					Tweet
				</Button>
			</form>
		</div>
	);
}

export default TweetBox;
