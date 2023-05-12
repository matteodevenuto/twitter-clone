import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

import './SettingsOptions.css';

import { UserContext } from '../../contexts/UserContext';
import { db } from '../../utils/firebase';

function SettingsOptions() {
	const { currentUser } = useContext(UserContext);
	const navigate = useNavigate();
	const [formFields, setFormFields] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields((prevFields) => ({
			...prevFields,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const userDocRef = doc(db, 'users', currentUser);
			const userSnapshot = await getDoc(userDocRef);

			if (userSnapshot.exists()) {
				await updateDoc(userDocRef, formFields);

				navigate('/profile');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="settings">
			<div className="header">
				<h2>Settings</h2>
			</div>
			<div className="body">
				<form className="form" onSubmit={handleSubmit}>
					<input
						name="displayName"
						placeholder="Change Display Name"
						type="text"
						onChange={handleChange}
					/>
					<input
						name="username"
						placeholder="Change Username"
						type="text"
						onChange={handleChange}
					/>
					<input
						name="profilePicture"
						placeholder="Add Profile Picture URL"
						type="url"
						onChange={handleChange}
					/>
					<input
						name="banner"
						placeholder="Add Banner URL (600x200)"
						type="url"
						onChange={handleChange}
					/>
					<input
						name="bio"
						placeholder="Add Bio"
						type="text"
						onChange={handleChange}
					/>
					<input
						name="location"
						placeholder="Add Location"
						type="text"
						onChange={handleChange}
					/>
					<input
						name="url"
						placeholder="Add Link"
						type="url"
						onChange={handleChange}
					/>
					<button type="submit">Save Changes</button>
				</form>
			</div>
		</div>
	);
}

export default SettingsOptions;
