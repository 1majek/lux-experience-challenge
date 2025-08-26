import { useQuery } from '@tanstack/react-query'
import { upcomingMovies } from '.'

export const useUpcomingMoviesApi = () => {
  const result = useQuery({
    queryKey: ['upcoming-movies'],
    queryFn: upcomingMovies
  })

  return {
    ...result,
    upcomingMovies: result.data || [],
    isUpcomingMoviesLoading: result.isLoading,
    isUpcomingMoviesError: result.isError,
  }
}