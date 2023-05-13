import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';

import './Auth.css';

// COMPONENTS
import SignIn from '../Forms/Sign-in';
import SignUp from '../Forms/Sign-up';

function Auth() {
	return (
		<div className="auth-container">
			<div className="logo-container">
				<TwitterIcon className="logo" />
			</div>
			<div className="forms-container">
				<SignIn />
				<SignUp />
			</div>
		</div>
	);
}

export default Auth;
