const outfit = require("../dist/");
const { walkDir, getOutfit } = require("../dist/");

const fs = require("fs");

walkDir({
  initPath: "/Volumes/Seagate Backup Plus Drive/2308/",
  fileList: [],
}).then((list) => {
  // console.log(list);
  const complete = [];
  const unComplete = [];
  list.forEach((item) => {
    const { filename, fileDir, stats } = item;
    const res = getOutfit(filename);

    if (res) {
      complete.push({ outfit: res, fileDir });
    } else {
      unComplete.push({ filename, fileDir });
    }
    // const o = outfit.match(re2);
    // if (o && o[0]) {
    //   let co = o[0];
    //   co = co.replace(/add/i, "-");
    //   if (co.indexOf("-") === -1) {
    //     co = divLetterAndNumber(co);
    //   }
    //   complete.push({ outfit: co, fileDir });
    // } else {
    //   unComplete.push({ fileDir });
    // }
  });

  console.log(complete.length / (unComplete.length + complete.length));
  fs.writeFileSync("./output.json", JSON.stringify({ complete, unComplete }));
});
