const csv = require("csv");
const fs = require("fs");
const path = require("path");

const MONITOR_FILE_PATH = path.join(__dirname, "../data/montior.csv");

const getMonitoringData = () => {
  return new Promise((resolve) => {
    const data = [];
    fs.createReadStream(MONITOR_FILE_PATH)
      .pipe(csv.parse({ columns: true }))
      .on("data", (row) => {
        data.push({
          id: row.id,
          lastSeenLowest: Number(row.lastSeenLowest),
        });
      })
      .on("end", () => {
        resolve(data);
      });
  });
};

const updateMonitoringData = (data) => {
  return new Promise((resolve) => {
    csv
      .stringify(data, { header: true })
      .pipe(fs.createWriteStream(MONITOR_FILE_PATH))
      .on("finish", () => resolve());
  });
};

module.exports = { getMonitoringData, updateMonitoringData };
