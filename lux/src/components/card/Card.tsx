import React from 'react'
import './Card.scss'
import type { CastMember, Movie } from '../../api/movies/interfaces'
import WishlistIcon from '../WishlistIcon'
import { useCard } from './useCard'

interface CardProps {
  content: Pick<Movie, 'id' | 'title' | 'poster_path'> | CastMember,
  categoryColor?: string,
  category?: string,
}

const Card: React.FC<CardProps> = ({ content, category, categoryColor }) => {

  const { normalized, handleCardClick, handleKeyDown, imageUrl, isMovie, currentPage, wishIconRef, movieInWishList } = useCard({ content, category })

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
      <div className="card-title" title={normalized.title}>{normalized.title}</div>
      {isMovie(content) && currentPage !== 'wishlist' && (
        <WishlistIcon ref={wishIconRef} className='wishlist-icon' strokeColor={categoryColor} strokeWidth='3' opacity={movieInWishList ? '1' : '0.5'} fill={movieInWishList ? categoryColor : 'none'} />
      )}
    </div>
  )
}

export default Card