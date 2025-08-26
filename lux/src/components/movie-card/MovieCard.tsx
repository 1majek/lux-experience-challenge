import React from 'react'
import './MovieCard.scss'
import type { Movie } from '../../api/movies/interfaces'

interface MovieCardProps {
  movie: Pick<Movie, 'id' | 'title' | 'poster_path'>
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  const onMovieClick = (movie: Pick<Movie, 'id' | 'title' | 'poster_path'>) => {
    console.log('Movie clicked:', movie)
  }
  return (
    <div
      className="movie-item"
      key={movie.id}
      onClick={() => onMovieClick(movie)}
      tabIndex={0}
      role="button"
      aria-label={movie.title}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-title">{movie.title}</div>
    </div>
  )
}

export default MovieCard