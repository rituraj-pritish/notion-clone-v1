import { render, RenderOptions } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import '@testing-library/jest-dom';
import React from 'react';

import { Providers } from '../pages/_app';
import { Options } from 'next-page-tester/dist/commonTypes';

jest.mock('next/image', () => ({
	__esModule: true,
	default: () => {
		return 'Next image stub';
	},
}));

const customGetPage = (options: Options) => getPage({
	req: req => {
		req.cookies.auth_token = 'auth_token';
		return req;
	},
	...options
});

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
export { customGetPage as getPage };
export { customRender as render };