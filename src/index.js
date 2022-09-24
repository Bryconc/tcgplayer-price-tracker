const { monitor } = require("./monitor");
const cron = require("node-cron");

cron.schedule("*/30 * * * *", monitor);
