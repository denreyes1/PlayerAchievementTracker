require('dotenv').config();

const env = process.env.NODE_ENV || 'development'; // Default to development
console.log(`Loading configuration for environment: ${env}`);

module.exports = require(`./env/${env}.js`);
