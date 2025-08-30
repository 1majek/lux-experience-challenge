import { useQuery } from '@tanstack/react-query'
import { fetchPopularMovies } from '.'

export const usePopularMoviesApi = () => {
  const result = useQuery({
    queryKey: ['popular-movies'],
    queryFn: fetchPopularMovies
  })

  return {
    ...result,
    popularMovies: result.data || [],
    isPopularMoviesLoading: result.isLoading,
    isPopularMoviesError: result.isError,
  }
}