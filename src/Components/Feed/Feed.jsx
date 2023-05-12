import React from 'react';
import './Feed.css';

//COMPONENTS
import TweetBox from './TweetBox';
import Posts from './Posts';

function Feed() {
	return (
		<div className="feed">
			<div className="feed__header">
				<h2>Home</h2>
			</div>

			<TweetBox />

			<Posts />
		</div>
	);
}

export default Feed;
