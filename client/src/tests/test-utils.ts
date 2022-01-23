import { render, RenderOptions } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import '@testing-library/jest-dom';
import { Options } from 'next-page-tester/dist/commonTypes';
import React from 'react';

import { Providers } from '../pages/_app';

jest.mock('next/image', () => ({
	__esModule: true,
	default: () => {
		return 'Next image stub';
	}
}));

const customGetPage = (options: Options) =>
	getPage({
		req: (req) => {
			req.cookies.auth_token = 'auth_token';
			return req;
		},
		...options
	});

const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => {
	render(ui, {
		wrapper: Providers,
		...options
	});
};

// eslint-disable-next-line
export * from '@testing-library/react';
export { customGetPage as getPage };
// eslint-disable-next-line
export { customRender as render };
