import React from 'react';

import './Profile.css';

import Posts from '../Feed/Posts';

import VerifiedIcon from '@mui/icons-material/Verified';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import LinkIcon from '@mui/icons-material/Link';

const Profile = ({
	username,
	name,
	bio,
	followerCount,
	followingCount,
	tweetCount,
	location,
	link,
	verified,
	profilePicture,
	banner,
}) => {
	return (
		<div className="profile">
			<div className="profile-header">
				<div className="profile-banner">
					<img src={banner} />
				</div>
				<div className="profile-picture">
					{/* Display the user's profile picture */}
					<img src={profilePicture} alt="Profile Picture" />
				</div>
				<div className="profile-info">
					{/* Display the user's name and username */}
					<h2>
						{name}
						{verified && <VerifiedIcon className="verified__badge" />}
					</h2>
					<p>@{username}</p>
					{/* Display additional information like location, website, etc. if available */}
					<div className="profile-bio">
						{/* Display the user's bio/description */}
						<p>{bio}</p>
					</div>
					<div className="profile-extra">
						{location && <PlaceOutlinedIcon size="small" />}
						<p>{location}</p>
						{link && <LinkIcon size="small" />}
						<p>
							<a href={link} alt="link" className="link" target="__blank">
								{link}
							</a>
						</p>
					</div>
				</div>
			</div>
			<div className="profile-stats">
				{/* Display the follower count, following count, and tweet count */}
				<div>
					<span>{followerCount} </span>
					<span>Followers</span>
				</div>
				<div>
					<span>{followingCount} </span>
					<span>Following</span>
				</div>
				<div>
					<span>{tweetCount} </span>
					<span>Tweets</span>
				</div>
			</div>
			<div className="profile-posts">
				<Posts />
			</div>
		</div>
	);
};

export default Profile;
