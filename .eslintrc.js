module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'react-app'
  ],
  rules: {
    // Disable rules that might cause build failures
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/anchor-is-valid': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
}; 