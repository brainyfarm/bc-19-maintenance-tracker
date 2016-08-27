module.exports = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.requestStatusClass = requestStatusClass;
  res.locals.moment = require('moment')
  next();
}

function requestStatusClass(request) {
  return {
    reported: "status-info",
    declined: "status-error",
    escalated: "status-error",
    assigned: "status-working",
    resolved: "status-success"
  }[request.status]
}
