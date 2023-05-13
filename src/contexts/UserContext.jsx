import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(() => {
		const storedUser = sessionStorage.getItem('currentUser');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const setUser = (user) => {
		setCurrentUser(user);
		sessionStorage.setItem('currentUser', JSON.stringify(user));
	};

	// Optional: Clear session storage on logout
	const logout = () => {
		setCurrentUser(null);
		sessionStorage.removeItem('currentUser');
	};

	// Optional: Check if user is still authenticated on component mount
	const navigate = useNavigate();
	useEffect(() => {
		const storedUser = sessionStorage.getItem('currentUser');
		if (!storedUser) {
			navigate('/');
		}
	}, []);

	const value = { currentUser, setCurrentUser: setUser, logout };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
