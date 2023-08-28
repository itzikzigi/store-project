const chalk = require("chalk");

const handleError = (err, res, stat = 400) => {
  console.error(chalk.redBright(err.message));
  return res.status(stat).send(err.message);
};
const serverErrorsHandler = (error, req, res, next) => {
  console.error(chalk.redBright(error.message));
  res.status(500).send(error.message);
  next();
};
module.exports = { handleError, serverErrorsHandler };
