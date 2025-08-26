import type { Movie } from "../interfaces"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchTopRatedMovies = async (): Promise<Movie[]> => {
    const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Failed to fetch top rated movies')
    }
    const data = await response.json()
    return data.results
}