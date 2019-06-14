// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
        es6: true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        "vue/no-unused-vars": "off",
        "vue/no-unused-components": "off",
        "no-unused-vars": "off",
        "prefer-promise-reject-errors": "off",
        "no-redeclare": "off",
        "padded-blocks": ["error", "never"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": ["error", "always"],
        "semi": ["error", "always"],
        "newline-after-var": ["error", "always"],
        "comma-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "space-infix-ops": "error",
        "key-spacing": ["error", { "beforeColon": false }],
        "object-curly-spacing": ["error", "never"],
        "indent": ["error", 4, {"SwitchCase": 1}],
        "no-spaced-func": "error",
        "generator-star-spacing": "off",
        'eqeqeq': 'off',
        'camelcase': 'off',
        'eol-last': ['error', 'never'],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}