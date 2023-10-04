const outfit = require('../dist')
const { walkDir } = require('../dist')
const path = require('path')
const fs = require('fs');

// import('../dist/index.js').then(console)

// console.log(outfit)
// outfit()
walkDir('/Volumes/Seagate Backup Plus Drive/2308/', []).then(list => {
  // console.log(list)
  const re1 = /[A-Z]{2,5}-\d{3,4}[A-Z]?/i
  const re2 = /[A-Z]{1,5}-?\d{2,5}[A-Z]?/i
  // const re = re1 | re2
  // const re = /(/[A - Z]{ 2, 5}-\d{ 3, 4 } [A - Z] ? /i) | (/[A - Z]{ 2, 5 } \d{ 3, 5 } [A - Z] ?/i)/
  const complete = []
  const unComplete = []
  list.forEach(item => {
    const { outfit } = item;
    const o = outfit.match(re2);
    if (o && o[0]) {
      const co = o[0]
      complete.push(o)
    } else {
      unComplete.push(outfit)
    }
  })

  console.log(complete.length / unComplete.length)
  fs.writeFileSync('./output.json', JSON.stringify({ complete, unComplete }))
})