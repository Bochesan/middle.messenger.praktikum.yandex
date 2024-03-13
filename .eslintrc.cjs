module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: {
			ts: '@typescript-eslint/parser',
		},
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-undef': 'off',
		'no-tabs': 'off',
		'no-shadow': 'off',
		'no-underscore-dangle': 'off',
		'class-methods-use-this': 'off',
		indent: 'off',
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'consistent-return': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	}
};
