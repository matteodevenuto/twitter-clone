import { useState } from 'react';

import './Form.css';

import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase';

const defaultFormFields = {
	email: '',
	password: '',
};

function SignIn() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			console.log(response);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Error: wrong password!');
					break;
				case 'auth/user-not-found':
					alert('Error: no user associated with this email!');
					break;
				default:
					console.log(error);
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
		<div className="container">
			<div className="form">
				<h2>Sign In</h2>
				<form onSubmit={handleSubmit}>
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
					<button className="button" type="submit">
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
