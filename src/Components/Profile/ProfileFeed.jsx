import React, { useState, useEffect } from 'react';
import Post from '../Feed/Post';

// FIRESTORE
import { db } from '../../utils/firebase';
import {
	collection,
	getDocs,
	doc,
	getDoc,
	query,
	where,
} from 'firebase/firestore';

function ProfileFeed({ userId }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function getPosts() {
			const postsCol = collection(db, 'posts');

			// Get posts where userRef field matches the userId
			const userPostsQuery = query(
				postsCol,
				where('userRef', '==', doc(db, `users/${userId}`))
			);

			const postSnapshot = await getDocs(userPostsQuery);

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

			// Sort posts based on a timestamp field in descending order
			postResults.sort((a, b) => b.timestamp - a.timestamp);

			setPosts(postResults);
		}

		getPosts();
	}, [userId]);

	return (
		<div>
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

export default ProfileFeed;
