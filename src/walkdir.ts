import * as path from "path"
import * as fs from "fs"
import isMovie from "./isMovie"

const getMovieName = (stats: string) => {
  const arr = stats.split("/")
  const sufix = arr[arr.length - 1].split(".")[0]
  return sufix.toUpperCase()
}

export const walkDir = async (initPath: string, fileList: any[] = []) => {
  const files = await fs.readdirSync(initPath)
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fileDir = path.join(initPath, file)
    const stats = fs.statSync(fileDir)
    const isFile = stats.isFile()
    const isDirectory = stats.isDirectory()
    const isMov = isMovie(fileDir)
    if (isFile && isMov) {
      fileList.push({ fileDir, outfit: getMovieName(fileDir), stats })
    }
    if (isDirectory) {
      const dirs = await walkDir(fileDir, [])
      fileList.push(...dirs)
    }
  }

  return fileList
}

export default walkDir
