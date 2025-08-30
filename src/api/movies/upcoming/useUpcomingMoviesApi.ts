import { useQuery } from '@tanstack/react-query'
import { fetchUpcomingMovies } from '.'

export const useUpcomingMoviesApi = () => {
  const result = useQuery({
    queryKey: ['upcoming-movies'],
    queryFn: fetchUpcomingMovies
  })

  return {
    ...result,
    upcomingMovies: result.data || [],
    isUpcomingMoviesLoading: result.isFetching,
    isUpcomingMoviesError: result.isError,
  }
}