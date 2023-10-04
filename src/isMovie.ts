import { MOVIE_TYPES } from "./config"
const isMovie = (stats: string) => {
  const arr = stats.split(".")
  const sufix: string = arr.pop() || ""
  return MOVIE_TYPES.includes(sufix.toLowerCase())
}

export default isMovie
