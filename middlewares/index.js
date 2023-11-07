const fs = require("fs");

function updateLog(fileName) {
  return (req, res, next) => {
    const log = `\n${Date.now()} ${req.method} ${req.path} ${req.url}`;
    fs.appendFile(fileName, log, (err) => {
      next();
    });
  };
}

module.exports = updateLog;