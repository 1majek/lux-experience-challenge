import React, { useMemo } from 'react'
import './Card.scss'
import type { CastMember, Movie } from '../../api/movies/interfaces'
import { useNavigate } from 'react-router-dom'
import placeholderImage from './../../assets/placeholder-img.png'
import { useMovieContext } from '../../hooks/useMovieContext'

interface CardProps {
  content: Pick<Movie, 'id' | 'title' | 'poster_path'> | CastMember
  category?: string,
}

const Card: React.FC<CardProps> = ({ content, category }) => {
  const navigate = useNavigate()
  const { addMovie } = useMovieContext()

  const onMovieClick = (movieId: number) => {
    addMovie(content as Movie)
    navigate(`/movie/${movieId}`, { state: { category } })
  }

  const [movie, cast] = useMemo(() => {
    let movie: Pick<Movie, 'id' | 'title' | 'poster_path'> | null = null;
    let cast: CastMember | null = null;
    if ('title' in content) {
      movie = content as Pick<Movie, 'id' | 'title' | 'poster_path'>
    } else {
      cast = content as CastMember
    }
    return [movie, cast]
  }, [content])

  return (
    <div
      className="card-item"
      key={movie?.id || cast?.id}
      onClick={movie?.id ? () => onMovieClick(movie?.id) : undefined}
      tabIndex={0}
      role="button"
      aria-label={movie?.title || cast?.name}
      title={movie?.title || cast?.name}
    >
      {(movie?.poster_path || cast?.profile_path) ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie?.poster_path ?? cast?.profile_path}`}
          alt={movie?.title || cast?.name}
          className="card-poster"
        />
      ) : (
        <img src={placeholderImage} alt="Placeholder" className="card-poster" />
      )}

      <div className="card-title">{movie?.title || cast?.name}</div>
    </div>
  )
}

export default Card