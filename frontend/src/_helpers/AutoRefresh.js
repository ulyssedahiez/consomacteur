import { useEffect } from 'react';

function AutoRefresh({ intervalTime, refreshFunction }) {
	useEffect(() => {
		const intervalId = setInterval(() => {
			refreshFunction();
		}, intervalTime);

		return () => clearInterval(intervalId);
	}, [intervalTime, refreshFunction]);

	return null;
}

export default AutoRefresh;
