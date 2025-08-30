import type { MovieDetail } from "../interfaces"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchMovieDetail = async (id?: string): Promise<MovieDetail> => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits&language=en-US`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch movie details')
  }
  const data = await response.json()
  return data
}