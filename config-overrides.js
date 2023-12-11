const { override, useBabelRc, disableEsLint } = require('customize-cra');

module.exports = override(useBabelRc(), disableEsLint());
