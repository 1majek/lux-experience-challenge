import React from 'react'
import './Home.scss'
import Carousel from '../../components/carousel/Carousel'
import { usePopularMoviesApi } from '../../api/movies/popular/usePopularMoviesApi'
import { useTopRatedMoviesApi } from '../../api/movies/top-rated/useTopRatedMoviesApi'
import { useUpcomingMoviesApi } from '../../api/movies/upcoming/useUpcomingMoviesApi'

const Home: React.FC = () => {

  const { popularMovies, isPopularMoviesLoading, isPopularMoviesError } = usePopularMoviesApi();
  const { topRatedMovies, isTopRatedMoviesLoading, isTopRatedMoviesError } = useTopRatedMoviesApi();
  const { upcomingMovies, isUpcomingMoviesLoading, isUpcomingMoviesError } = useUpcomingMoviesApi();

  return (
    <div className="home-page">
      <h1>Browse Movies</h1>
      <Carousel movies={popularMovies} title='Popular Movies' isLoading={isPopularMoviesLoading} isError={isPopularMoviesError} />
      <Carousel movies={topRatedMovies} title='Top Rated Movies' isLoading={isTopRatedMoviesLoading} isError={isTopRatedMoviesError} />
      <Carousel movies={upcomingMovies} title='Upcoming Movies' isLoading={isUpcomingMoviesLoading} isError={isUpcomingMoviesError} />
    </div>
  )
}

export default Home