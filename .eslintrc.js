module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    "use": true,
    "auth": true
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  "rules": {
    "strict": "off",
    "semi": ["error", "never"],
    "comma-dangle": ["error", "never"],
    "space-before-function-paren": ["error", { "anonymous": "never", "named": "always" }],
    "class-methods-use-this": "off",
    "object-curly-newline": ["error", { "multiline": true }],
    "global-require": "off",
    "arrow-parens": ["error", "as-needed"],
    "no-param-reassign": ["error", { "props": false }]
  },
}
