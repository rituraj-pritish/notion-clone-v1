import { Key, useEffect, useState } from 'react';

const useKeyPress = (targetKey: Key) => {
	const [keyPressed, setKeyPressed] = useState<boolean>(false);

	function downHandler({ key }) {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	}

	const upHandler = ({ key }) => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);

		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
		// eslint-disable-next-line
	}, []); 
	return keyPressed;
};

export default useKeyPress;