module.exports = {
	env: {
		node: true,
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	plugins: ['prettier'],

	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': ['error'],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'prettier/prettier': [2, { useTabs: true }],
		'no-undef': ['error', { typeof: true }],
		quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
	},
};
