import { useQuery } from '@tanstack/react-query'
import { fetchTopRatedMovies } from '.'

export const useTopRatedMoviesApi = () => {
  const result = useQuery({
    queryKey: ['top-rated-movies'],
    queryFn: fetchTopRatedMovies
  })

  return {
    ...result,
    topRatedMovies: result.data || [],
    isTopRatedMoviesLoading: result.isFetching,
    isTopRatedMoviesError: result.isError,
  }
}