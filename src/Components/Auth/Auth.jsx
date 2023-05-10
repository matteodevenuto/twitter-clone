import React from 'react';

// COMPONENTS
import SignIn from '../Forms/Sign-in';
import SignUp from '../Forms/Sign-up';

function Auth() {
	return (
		<div className="auth-container">
			<SignIn />
			<SignUp />
		</div>
	);
}

export default Auth;
