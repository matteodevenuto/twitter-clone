import React, { useState, useContext, useEffect } from 'react';
import './TweetBox.css';
import { Avatar, Button, LinearProgress } from '@mui/material';
import { UserContext } from '../../contexts/UserContext';
import { db, storage } from '../../utils/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function TweetBox() {
	const [tweetMessage, setTweetMessage] = useState('');
	const [tweetImage, setTweetImage] = useState(null);
	const [characterCount, setCharacterCount] = useState(0);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);

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

	const handleTweetMessageChange = (e) => {
		let message = e.target.value;
		if (message.length > 280) {
			message = message.slice(0, 280);
		}
		setTweetMessage(message);
		setCharacterCount(message.length);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setTweetImage(file);
	};

	const characterCountExceeded = characterCount === 280;
	const characterCountNone = characterCount === 0;
	const characterCountClassName = `tweetBox__characterCount ${
		characterCountExceeded ? 'exceeded' : ''
	} ${characterCountNone ? 'none' : ''}`;

	const handleImageUpload = async (e) => {
		e.preventDefault();

		if (!tweetMessage.trim() && !tweetImage) {
			alert('Cannot post empty tweet!');
			return;
		}

		try {
			if (tweetImage) {
				setIsUploading(true);
				const timestamp = new Date().getTime();
				const filename = `${timestamp}_${tweetImage.name}`;
				const storageRef = ref(
					storage,
					`tweetImages/${currentUser}/${filename}`
				);
				const uploadTask = uploadBytesResumable(storageRef, tweetImage);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						);
						setUploadProgress(progress);
					},
					(error) => {
						console.error('Image upload error:', error);
						setIsUploading(false);
					},
					async () => {
						try {
							const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
							const userDocRef = doc(db, 'users', currentUser);
							const newPost = doc(collection(db, 'posts'));
							const data = {
								text: tweetMessage,
								image: downloadURL,
								userRef: userDocRef,
								timestamp: new Date(),
							};

							await setDoc(newPost, data);
							setTweetMessage('');
							setTweetImage(null);
							setCharacterCount(0);
							setUploadProgress(0);
							setIsUploading(false);
						} catch (error) {
							console.error('Error saving download URL:', error);
							setIsUploading(false);
						}
					}
				);
			} else {
				const userDocRef = doc(db, 'users', currentUser);
				const newPost = doc(collection(db, 'posts'));
				const data = {
					text: tweetMessage,
					image: null,
					userRef: userDocRef,
					timestamp: new Date(),
				};

				await setDoc(newPost, data);
				setTweetMessage('');
				setTweetImage(null);
				setCharacterCount(0);
			}
		} catch (error) {
			console.error('Error creating tweet:', error);
		}
	};

	return (
		<div className="tweetBox">
			<form onSubmit={handleImageUpload}>
				<div className="tweetBox__input">
					<Avatar
						alt="Avatar"
						src={userData?.avatar}
						sx={{ width: 48, height: 48 }}
					/>
					<input
						onChange={handleTweetMessageChange}
						value={tweetMessage}
						placeholder="What's happening?"
						type="text"
					/>
				</div>
				<input
					onChange={handleImageChange}
					className="tweetBox__imageInput"
					id="fileInput"
					placeholder="Drag and drop or click to add image"
					type="file"
					accept="image/*"
				/>

				<Button
					type="submit"
					className="tweetBox__tweetButton"
					disabled={characterCountExceeded}
				>
					Tweet
				</Button>
			</form>
			<div className="progress-bar">
				{isUploading && (
					<LinearProgress variant="determinate" value={uploadProgress} />
				)}
			</div>

			<div className={characterCountClassName}>
				{characterCount}/{280}
			</div>
		</div>
	);
}

export default TweetBox;
