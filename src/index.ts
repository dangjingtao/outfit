import walkDir from "./walkdir"
// const regex = /[A-Z]{2,5}-\d{3,4}[A-Z]?/i

const outfit = () => {
  console.log("hehe", walkDir)
}

export default outfit
// For CommonJS default export support
// module.exports = outfit
// module.exports.default = outfit

// export * from "./errors"
export { walkDir } from "./walkdir"
