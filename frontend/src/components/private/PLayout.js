import React from 'react';
import { Outlet } from 'react-router-dom';

const PLayout = () => {
	return (
		<div className="PLayout">
			<Outlet />
		</div>
	);
};

export default PLayout;
