import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetail } from '.'

export const useMovieDetailApi = (id?: string) => {
  const result = useQuery({
    queryKey: ['movies-detail'],
    queryFn: () => fetchMovieDetail(id),
    enabled: Boolean(id)
  })

  return {
    ...result,
    movieDetail: result.data || null,
    isLoading: result.isFetching,
    isError: result.isError,
  }
}