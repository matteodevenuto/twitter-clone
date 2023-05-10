import React, { useState } from 'react';

import './TweetBox.css';

import { Avatar, Button } from '@mui/material';

// FIRESTORE
import { db } from '../../utils/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

function TweetBox() {
	const [tweetMessage, setTweetMessage] = useState('');
	const [tweetImage, setTweetImage] = useState('');

	const sendTweet = (e) => {
		e.preventDefault();

		const newPost = doc(collection(db, 'posts'));
		const data = {
			displayName: 'Matteo De Venuto',
			username: 'matteodevenuto',
			verified: true,
			text: tweetMessage,
			image: tweetImage,
			avatar:
				'https://pbs.twimg.com/profile_images/1646606686172467202/oX95Ekb4_400x400.jpg',
		};
		setDoc(newPost, data);
		setTweetMessage('');
		setTweetImage('');
	};

	return (
		<div className="tweetBox">
			<form>
				<div className="tweetBox__input">
					<Avatar
						alt="Avatar"
						src="https://pbs.twimg.com/profile_images/1646606686172467202/oX95Ekb4_400x400.jpg"
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
