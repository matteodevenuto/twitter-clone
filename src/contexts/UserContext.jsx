import { createContext, useState } from 'react';

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(() => {
		const storedUser = localStorage.getItem('currentUser');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const setUser = (user) => {
		setCurrentUser(user);
		localStorage.setItem('currentUser', JSON.stringify(user));
	};

	const value = { currentUser, setCurrentUser: setUser };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
