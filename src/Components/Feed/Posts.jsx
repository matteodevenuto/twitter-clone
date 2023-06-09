import React, { useState, useEffect } from 'react';
import Post from './Post';
import './Posts.css';
import { db } from '../../utils/firebase';
import {
	collection,
	getDocs,
	query,
	orderBy,
	getDoc,
} from 'firebase/firestore';

function Posts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		let isMounted = true;

		const getPosts = async () => {
			const postsCol = collection(db, 'posts');
			const orderedQuery = query(postsCol, orderBy('timestamp', 'desc'));
			const postSnapshot = await getDocs(orderedQuery);

			const postPromises = postSnapshot.docs.map(async (doc) => {
				const post = doc.data();
				const userRef = doc.data().userRef;
				if (userRef) {
					const userSnapshot = await getDoc(userRef);
					const userData = userSnapshot.data();
					return { ...post, userRef: userData };
				} else {
					return post;
				}
			});

			const postResults = await Promise.all(postPromises);
			if (isMounted) {
				setPosts(postResults);
			}
		};

		getPosts();

		const pollingInterval = setInterval(getPosts, 10000); // Poll every 10 seconds

		return () => {
			isMounted = false;
			clearInterval(pollingInterval);
		};
	}, []);

	return (
		<div className="posts-container">
			{posts.map((post) => (
				<Post
					key={post.text}
					displayName={post.userRef.displayName}
					username={post.userRef.username}
					verified={post.userRef.verified}
					text={post.text}
					avatar={post.userRef.avatar}
					image={post.image}
				/>
			))}
		</div>
	);
}

export default Posts;
