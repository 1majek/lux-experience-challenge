import React from 'react'
import { usePopularMoviesApi } from '../../api/movies/popular/usePopularMoviesApi'
import { useTopRatedMoviesApi } from '../../api/movies/top-rated/useTopRatedMoviesApi'
import { useUpcomingMoviesApi } from '../../api/movies/upcoming/useUpcomingMoviesApi'
import { popularMoviesTitle, topRatedMoviesTitle, upcomingMoviesTitle } from '../../utils'
import MovieCarousel from '../../components/MovieCarousel'
import './Home.scss'

const Home: React.FC = () => {
  const popular = usePopularMoviesApi();
  const topRated = useTopRatedMoviesApi();
  const upcoming = useUpcomingMoviesApi();

  const carousels = [
    {
      title: popularMoviesTitle,
      movies: popular.popularMovies,
      isLoading: popular.isPopularMoviesLoading,
      isError: popular.isPopularMoviesError,
      categoryColor: "yellow"
    },
    {
      title: topRatedMoviesTitle,
      movies: topRated.topRatedMovies,
      isLoading: topRated.isTopRatedMoviesLoading,
      isError: topRated.isTopRatedMoviesError,
      categoryColor: "magenta"
    },
    {
      title: upcomingMoviesTitle,
      movies: upcoming.upcomingMovies,
      isLoading: upcoming.isUpcomingMoviesLoading,
      isError: upcoming.isUpcomingMoviesError,
      categoryColor: "pink"
    },
  ];

  return (
    <div className="home-page">
      <h1>Browse Movies</h1>
      {carousels.map((carousel) => (
        <MovieCarousel key={carousel.title} {...carousel} />
      ))}
    </div>
  )
}

export default Home