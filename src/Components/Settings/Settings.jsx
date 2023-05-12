import React from 'react';

import './Settings.css';
import SettingsOptions from './SettingsOptions';

import Sidebar from '../Sidebar/Sidebar';

function Settings() {
	return (
		<div className="app">
			<Sidebar />
			<SettingsOptions />
		</div>
	);
}

export default Settings;
