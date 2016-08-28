const env = process.env.NODE_ENV || 'development'
const moment = require('moment');

module.exports = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.requestStatusClass = requestStatusClass;
  res.locals.formatDate = formatDate;
  res.locals.moment = require('moment');
  res.locals.env = env;
  next();
}

/**
 * Get CSS class for request status
 * @function
 * @param {Request} request
 * @return {String}
 */
function requestStatusClass(request) {
  return {
    reported: "status-info",
    rejected: "status-error",
    escalated: "status-error",
    assigned: "status-working",
    resolved: "status-success"
  }[request.status];
}

/**
 * Format date Aug 26th 16, 4:06 pm
 * @function
 * @param {Date} date Date to be formated.
 * @return {String} 
 */
function formatDate(date) {
  return moment(date).format('MMM Do YY, h:mm a');
}
