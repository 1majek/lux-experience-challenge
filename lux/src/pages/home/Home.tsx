import React from 'react'
import './Home.scss'
import Carousel from '../../components/carousel/Carousel'
import { usePopularMoviesApi } from '../../api/movies/popular/usePopularMoviesApi'
import { useTopRatedMoviesApi } from '../../api/movies/top-rated/useTopRatedMoviesApi'
import { useUpcomingMoviesApi } from '../../api/movies/upcoming/useUpcomingMoviesApi'
import { popularMoviesTitle, topRatedMoviesTitle, upcomingMoviesTitle } from '../../utils'
import Card from '../../components/card/Card'

const Home: React.FC = () => {

  const { popularMovies, isPopularMoviesLoading, isPopularMoviesError } = usePopularMoviesApi();
  const { topRatedMovies, isTopRatedMoviesLoading, isTopRatedMoviesError } = useTopRatedMoviesApi();
  const { upcomingMovies, isUpcomingMoviesLoading, isUpcomingMoviesError } = useUpcomingMoviesApi();

  return (
    <div className="home-page">
      <h1>Browse Movies</h1>
      <Carousel title={popularMoviesTitle} isLoading={isPopularMoviesLoading} isError={isPopularMoviesError}>
        {popularMovies.map((movie) => (
          <Card key={movie.id} content={movie} category={popularMoviesTitle} />
        ))}
      </Carousel>

      <Carousel title={topRatedMoviesTitle} isLoading={isTopRatedMoviesLoading} isError={isTopRatedMoviesError}>
        {topRatedMovies.map((topMovies) => (
          <Card key={topMovies.id} content={topMovies} category={topRatedMoviesTitle} />
        ))}
      </Carousel>

      <Carousel title={upcomingMoviesTitle} isLoading={isUpcomingMoviesLoading} isError={isUpcomingMoviesError}>
        {upcomingMovies.map((upcomingMovies) => (
          <Card key={upcomingMovies.id} content={upcomingMovies} category={upcomingMoviesTitle} />
        ))}
      </Carousel>
    </div>
  )
}

export default Home