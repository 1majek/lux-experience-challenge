import React from 'react'
import './Card.scss'
import type { CastMember, Movie } from '../../api/movies/interfaces'
import { useNavigate } from 'react-router-dom'
import placeholderImage from './../../assets/placeholder-img.png'
import { useMovieContext } from '../../hooks/useMovieContext'

interface CardProps {
  content: Pick<Movie, 'id' | 'title' | 'poster_path'> | CastMember
  category?: string,
}

// Type guard to check if content is a Movie
function isMovie(content: CardProps['content']): content is Pick<Movie, 'id' | 'title' | 'poster_path'> {
  return 'title' in content;
}

const Card: React.FC<CardProps> = ({ content, category }) => {
  const navigate = useNavigate()
  const { addMovie } = useMovieContext()

  // Normalize content to a consistent shape for easier use in JSX
  const normalized = {
    id: content.id,
    title: isMovie(content) ? content.title : content.name,
    imagePath: isMovie(content) ? content.poster_path : content.profile_path,
    isClickable: isMovie(content),
  }

  const imageUrl = normalized.imagePath
    ? `https://image.tmdb.org/t/p/w200${normalized.imagePath}`
    : placeholderImage;

  const handleCardClick = () => {
    if (normalized.isClickable) {
      addMovie(content as Movie)
      navigate(`/movie/${normalized.id}`, { state: { category } })
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  }

  return (
    <div
      className="card-item"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={normalized.title}
      title={normalized.title}
    >
      <img
        src={imageUrl}
        alt={normalized.title || 'Poster'}
        className="card-poster"
      />
      <div className="card-title">{normalized.title}</div>
    </div>
  )
}

export default Card