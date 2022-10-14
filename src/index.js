const cron = require("node-cron");
const { monitor } = require("./monitor");
const notifier = require("./personal-machine-notifier");

cron.schedule("*/30 * * * *", () => {
  monitor(notifier);
});

monitor(notifier);
