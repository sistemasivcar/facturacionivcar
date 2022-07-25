
const prodLogger = require('./prod-logger');
const devLogger = require('./dev-logger');
console.log(__filename)
let logger = null;

if (process.env.NODE_ENV == 'production') { logger = prodLogger }
else if (process.env.NODE_ENV == 'development') { logger = devLogger }




module.exports = logger;
