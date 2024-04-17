const pluginSecurity = require('eslint-plugin-security');
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    pluginSecurity.configs.recommended,
    {
        rules: {
            "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
            "no-undef": "error"
        },
        languageOptions: { globals: globals.node }
    }
];