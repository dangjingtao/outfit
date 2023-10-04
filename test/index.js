const fs = require("fs");
const { indexMovie } = require("../dist/");

indexMovie({
  initPath: "/Volumes/Seagate Backup Plus Drive/2308/",
}).then(({ complete, unComplete }) => {
  console.log(complete.length / (unComplete.length + complete.length));
  fs.writeFileSync("./output.json", JSON.stringify({ complete, unComplete }));
});
