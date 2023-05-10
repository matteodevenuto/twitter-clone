import { useState } from 'react';

import './Form.css';

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

function SignUp() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, username, email, password, confirmPassword } =
		formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Password do not match !');
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName, username });
			resetFormFields();
			console.log(user);
		} catch (error) {
			switch (error.code) {
				case 'auth/email-already-in-use':
					alert('Cannot create user, email already in use');
					break;
				case 'auth/weak-password':
					alert('Password should be at least 6 characters');
					break;
				default:
					console.log(error.code);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({
			...formFields,
			[name]: value,
		});
	};

	return (
		<div className="form-container">
			<div className="form">
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Display Name"
						required
						onChange={handleChange}
						name="displayName"
						value={displayName}
					/>
					<input
						type="text"
						placeholder="Username"
						required
						onChange={handleChange}
						name="username"
						value={username}
					/>
					<input
						type="email"
						placeholder="Email"
						required
						onChange={handleChange}
						name="email"
						value={email}
					/>
					<input
						type="password"
						placeholder="Password"
						required
						onChange={handleChange}
						name="password"
						value={password}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						required
						onChange={handleChange}
						name="confirmPassword"
						value={confirmPassword}
					/>
					<button className="button" type="submit">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
