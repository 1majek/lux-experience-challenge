import React, { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useMovieDetailApi } from '../../api/movies/movie-detail/useMovieDetailApi'
import { popularMoviesTitle, topRatedMoviesTitle, upcomingMoviesTitle } from '../../utils'
import './MovieDetail.scss'
import Carousel from '../../components/carousel/Carousel'
import Card from '../../components/card/Card'


const MovieDetailPage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id?: string }>()
  const { category } = location.state

  const { movie, isLoading, error } = useMovieDetailApi(id)

  const handleAddToWishList = () => {
  }

  // Conditional styling based on movie rating
  const categoryClass = useMemo(() => {
    switch (category) {
      case popularMoviesTitle:
        return 'popular';
      case topRatedMoviesTitle:
        return 'top-rated';
      case upcomingMoviesTitle:
        return 'upcoming';
    }
  }, [category]);

  if (isLoading) return <div>Loading...</div>
  if (error || !movie) return <div>Movie not found.</div>

  // Set dynamic background style
  const backgroundStyle = movie.backdrop_path
    ? {
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      backgroundSize: categoryClass == "popular" ? 'auto' : "cover",
      backgroundPosition: categoryClass === "upcoming" ? 'top' : 'bottom',
      backgroundRepeat: 'no-repeat',
    }
    : {}

  return (
    <div className={`movie-detail-page ${categoryClass}`}>
      <div style={backgroundStyle}>
        <div className='movie-detail-container'>
          <img
            className="movie-detail-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="movie-detail-info">
            <h1>{movie.title}</h1>
            <p className="movie-detail-overview">{movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
            <button className="add-to-wishlist-btn" onClick={handleAddToWishList}>
              Add to Wish List
            </button>
          </div>
        </div>
      </div>

      <Carousel title='Casts' isLoading={isLoading} isError={Boolean(error)}>
        {movie?.credits.cast.map((cast) => (
          <Card key={cast.id} content={cast} />
        ))}
      </Carousel>
    </div>
  )
}

export default MovieDetailPage