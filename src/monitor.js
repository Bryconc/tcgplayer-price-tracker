const {
  getMonitoringData,
  updateMonitoringData,
} = require("./monitoring-data");
const { getLowestPrice } = require("./tcg-player");

const getAllLowestPrices = (items) => {
  return Promise.all(
    items.map((item) =>
      getLowestPrice(item.id).then((lowestPrice) => ({
        ...item,
        lowestPrice,
      }))
    )
  );
};

const findPriceChanges = (items) => {
  return items.map((item) => {
    if (item.lowestPrice !== item.lastSeenLowest) {
      item.alertOnPriceChange = true;
      item.priceChange = {
        from: item.lastSeenLowest,
        to: item.lowestPrice,
      };
    }
    item.lastSeenLowest = item.lowestPrice;
    return item;
  });
};

const alertOnNewLowestPrices = (items) => {
  let messages = [];
  for (let item of items) {
    if (item.alertOnPriceChange) {
      let message = `Price change detected for item ${item.id}!`;
      if (item.priceChange.from > item.priceChange.to) {
        message = `${message} Price decreased from ${item.priceChange.from} to ${item.priceChange.to}`;
      } else {
        message = `${message} Price increased from ${item.priceChange.from} to ${item.priceChange.to}`;
      }
      messages.push(message);
    }
  }

  if (!messages.length) {
    console.debug("No price change detected.");
  } else {
    const message = messages.join("\n");
    console.log(message);
  }
};

const monitor = () => {
  return getMonitoringData()
    .then((data) => getAllLowestPrices(data))
    .then((data) => findPriceChanges(data))
    .then((data) => {
      alertOnNewLowestPrices(data);

      const writeData = data.map((item) => ({
        id: item.id,
        lastSeenLowest: item.lastSeenLowest,
      }));
      return updateMonitoringData(writeData);
    });
};

module.exports = { monitor };
