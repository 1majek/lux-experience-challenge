import { useDispatch, useSelector } from "react-redux"
import type { RootState } from '../store'
import type { Movie } from "../api/movies/interfaces"
import { addSelectedMovie } from "../store/movieSlice"

export const useMovieContext = () => {
  const dispatch = useDispatch()

  const addMovie = (movie: Movie) => {
    dispatch(addSelectedMovie(movie))
  }

  const selectedMovie = useSelector((state: RootState) => state.selectedMovie.movie)

  return { addMovie, selectedMovie }
}