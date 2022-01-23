module.exports = {
	collectCoverageFrom: [
		'**/*.{js,jsx,ts,tsx}',
		'!**/*.d.ts',
		'!**/node_modules/**'
	],
	moduleNameMapper: {
		// Handle CSS imports (with CSS modules)
		// https://jestjs.io/docs/webpack#mocking-css-modules
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

		// Handle CSS imports (without CSS modules)
		'^.+\\.(css|sass|scss)$': '<rootDir>/src/tests/mocks/styleMock.js',

		// Handle image imports
		// https://jestjs.io/docs/webpack#handling-static-assets
		'^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$':
			'<rootDir>/src/tests/mocks/fileMock.js',

		// Handle module aliases
		'^@/api/(.*)$': '<rootDir>/src/api/$1',
		'^@/api': '<rootDir>/src/api',
		'^@/atoms': '<rootDir>/src/atoms',
		'^@/components': '<rootDir>/src/components',
		'^@/core/(.*)$': '<rootDir>/src/core/$1',
		'^@/constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@/graphql/(.*)$': '<rootDir>/src/graphql/$1',
		'^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
		'^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
		'^@/modules/(.*)$': '<rootDir>/src/modules/$1',
		'^@/pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@/styles/(.*)$': '<rootDir>/src/styles/$1',
		'^@/shared/(.*)$': '<rootDir>/src/shared/$1',
		'^@/tests/(.*)$': '<rootDir>/src/tests/$1',
		'^@/theme/(.*)$': '<rootDir>/src/theme/$1',
		'^@/theme': '<rootDir>/src/theme',
		'^@/types/(.*)$': '<rootDir>/src/types/$1'
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
	transform: {
		// Use babel-jest to transpile tests with the next/babel preset
		// https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
	},
	transformIgnorePatterns: [
		'/node_modules/',
		'^.+\\.module\\.(css|sass|scss)$'
	],
	testEnvironment: 'jest-environment-jsdom'
}
