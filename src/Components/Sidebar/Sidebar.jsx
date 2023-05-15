import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import SidebarOption from './SidebarOption';

// ICONS
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';

function Sidebar() {
	const [isActive, setIsActive] = useState('');
	const location = useLocation();

	useEffect(() => {
		setIsActive(location.pathname);
	}, [location]);

	return (
		<div className="sidebar-container">
			<div className="sidebar">
				<Link to="/home">
					<TwitterIcon className="sidebar__twitterIcon" />
				</Link>

				<Link to="/home">
					<SidebarOption
						active={isActive === '/home'}
						Icon={HomeIcon}
						text="Home"
					/>
				</Link>
				<Link to="/explore">
					<SidebarOption
						active={isActive === '/explore'}
						Icon={TagIcon}
						text="Explore"
					/>
				</Link>
				<Link to="/notifications">
					<SidebarOption
						active={isActive === '/notifications'}
						Icon={NotificationsNoneIcon}
						text="Notifications"
					/>
				</Link>
				<Link to="/messages">
					<SidebarOption
						active={isActive === '/messages'}
						Icon={MailOutlineIcon}
						text="Messages"
					/>
				</Link>
				<Link to="/bookmarks">
					<SidebarOption
						active={isActive === '/bookmarks'}
						Icon={BookmarkBorderIcon}
						text="Bookmarks"
					/>
				</Link>
				<Link to="/lists">
					<SidebarOption
						active={isActive === '/lists'}
						Icon={ListAltIcon}
						text="Lists"
					/>
				</Link>
				<Link to="/profile">
					<SidebarOption
						active={isActive === '/profile'}
						Icon={PermIdentityIcon}
						text="Profile"
					/>
				</Link>
				<Link to="/settings">
					<SidebarOption
						active={isActive === '/settings'}
						Icon={SettingsIcon}
						text="Settings"
					/>
				</Link>

				{/* Button -> Tweet */}
				<Button variant="outlined" className="sidebar__tweet" fullWidth>
					Tweet
				</Button>
			</div>
		</div>
	);
}

export default Sidebar;
