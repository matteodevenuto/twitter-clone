import React, { useState, useEffect } from 'react';
import './Feed.css';

//COMPONENTS
import TweetBox from './TweetBox';
import Post from './Post';

//FIRESTORE
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Feed() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function getPosts(db) {
			const postsCol = collection(db, 'posts');
			const postSnapshot = await getDocs(postsCol);
			const result = postSnapshot.docs.map((doc) => doc.data());
			setPosts(result);
		}
		getPosts(db);
	}, []);

	return (
		<div className="feed">
			<div className="feed__header">
				<h2>Home</h2>
			</div>

			<TweetBox />

			{posts.map((post) => (
				<Post
					key={post.text}
					displayName={post.displayName}
					username={post.username}
					verified={post.verified}
					text={post.text}
					avatar={post.avatar}
					image={post.image}
				/>
			))}
		</div>
	);
}

export default Feed;
