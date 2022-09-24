const notifier = require("node-notifier");
const path = require("path");

const APP_ID = "tcgplayer-monitor";
const NOTIFICATION_ICON = path.join(__dirname, "../assets/tcgplayer-icon.png");

const notify = (notificationData) => {
  notifier.notify({
    ...notificationData,
    icon: NOTIFICATION_ICON,
    appID: APP_ID,
  });
};

module.exports = { notify };
