import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './Form.css';

import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase';

import { UserContext } from '../../contexts/UserContext';

const defaultFormFields = {
	email: '',
	password: '',
};

function SignIn() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const navigate = useNavigate();

	const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			setCurrentUser(user.uid);
			resetFormFields();
			navigate('/profile');
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
		<div className="form-container">
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
