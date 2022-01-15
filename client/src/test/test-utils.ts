import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { Providers } from '../pages/_app';

jest.mock('next/image', () => ({
	__esModule: true,
	default: () => {
		return 'Next image stub';
	},
}));

const customRender = (
	ui: React.ReactElement, 
	options?: Omit<RenderOptions, 'wrapper'>
) => {
	render(
		ui, {
			wrapper: Providers,
			...options
		}
	);
};

export * from '@testing-library/react';
export { customRender as render };