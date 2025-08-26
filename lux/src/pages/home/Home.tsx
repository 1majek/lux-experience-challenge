import React from 'react'
import './Home.scss'
import Carousel from '../../components/carousel/Carousel'
import { usePopularMoviesApi } from '../../api/movies/popular/usePopularMoviesApi'

const categories = [
  { key: 'popular', label: 'Popular' },
  { key: 'top_rated', label: 'Top Rated' },
  { key: 'upcoming', label: 'Upcoming' },
]

const Home: React.FC = () => {

  const { popularMovies, isPopularMoviesLoading, isPopularMoviesError } = usePopularMoviesApi();
  if (isPopularMoviesLoading) return <div>Loading...</div>
  if (isPopularMoviesError) return <div>Error loading movies.</div>

  return (
    <div className="home-page">
      <h1>Browse Movies</h1>
      {categories.map((cat) => (
        <section key={cat.key} className="carousel-section">
          <h2>{cat.label} Movies</h2>
          <div className="carousel-placeholder">
            {!isPopularMoviesLoading && !isPopularMoviesError && (
              <Carousel movies={popularMovies} onMovieClick={() => { }} />
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home