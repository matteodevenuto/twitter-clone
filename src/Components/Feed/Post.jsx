import React, { forwardRef } from 'react';
import './Post.css';

import { Avatar } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Post = forwardRef(
	({ displayName, username, verified, text, image, avatar }, ref) => {
		return (
			<div className="post" ref={ref}>
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
					<img src={image} alt="" />
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
);

export default Post;
