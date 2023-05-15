import { useState } from 'react';
import './Post.css';

import { Avatar } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Post({ displayName, username, verified, text, image, avatar }) {
	const [expandedImage, setExpandedImage] = useState(false);

	const handleImageClick = () => {
		setExpandedImage(true);
	};

	const handleCloseImage = () => {
		setExpandedImage(false);
	};

	return (
		<div className="post">
			<div className="post__avatar">
				<Avatar alt="Avatar" src={avatar} sx={{ width: 48, height: 48 }} />
			</div>
			<div className="post__body">
				<div className="post__header">
					<div className="post__headerText">
						<h3>
							{displayName}{' '}
							<span className="post__headerSpecial">
								{verified && <VerifiedIcon className="post__badge" />} @
								{username}
							</span>
						</h3>
					</div>
					<div className="post__headerDescription">
						<p>{text}</p>
					</div>
				</div>
				{image && (
					<div className={`post__media ${expandedImage ? 'expanded' : ''}`}>
						<div className="post__media-container">
							<img
								className="post__image"
								src={image}
								alt=""
								onClick={handleImageClick}
							/>
						</div>
						{expandedImage && (
							<div className="post__imageOverlay" onClick={handleCloseImage}>
								<img className="post__expandedImage" src={image} alt="" />
							</div>
						)}
					</div>
				)}
				<div className="post__footer">
					<ChatBubbleOutlineIcon fontSize="small" />
					<RepeatIcon fontSize="small" />
					<FavoriteBorderIcon fontSize="small" />
					<BookmarkBorderIcon fontSize="small" />
					<IosShareIcon fontSize="small" />
				</div>
			</div>
		</div>
	);
}

export default Post;
