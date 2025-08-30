import React, { useEffect, useMemo } from 'react'
import './Card.scss'
import type { CastMember, Movie } from '../../api/movies/interfaces'
import { useLocation, useNavigate } from 'react-router-dom'
import placeholderImage from './../../assets/placeholder-img.png'
import { useMovieContext } from '../../hooks/useMovieContext'
import { getImageUrl } from '../../utils'
import { useWishListContext } from '../../hooks/useWishListContext'
import WishlistIcon from '../WishlistIcon'

interface CardProps {
  content: Pick<Movie, 'id' | 'title' | 'poster_path'> | CastMember,
  categoryColor?: string,
  category?: string,
}

// Type guard to check if content is a Movie
function isMovie(content: CardProps['content']): content is Pick<Movie, 'id' | 'title' | 'poster_path'> {
  return 'title' in content;
}

const Card: React.FC<CardProps> = ({ content, category, categoryColor }) => {
  const navigate = useNavigate()
  const location = useLocation();
  const { addMovie } = useMovieContext()
  const wishIconRef = React.useRef<SVGSVGElement | null>(null)
  const { isInWishList, addOrRemoveWishList } = useWishListContext()

  const currentPage = useMemo(() => {
    return location.pathname.split('/')[1]
  }, [location])

  // Normalize content to a consistent shape for easier use in JSX
  const normalized = {
    id: content.id,
    title: isMovie(content) ? content.title : content.name,
    imagePath: isMovie(content) ? content.poster_path : content.profile_path,
    isClickable: isMovie(content),
  }

  const imageUrl = normalized.imagePath
    ? getImageUrl(normalized.imagePath, 'w200')
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

  const movieInWishList = useMemo(() => {
    return isInWishList(String(normalized.id))
  }, [isInWishList, normalized.id])

  useEffect(() => {
    if (!isMovie(content)) return;
    const currentWishIconRef = wishIconRef?.current;
    currentWishIconRef?.addEventListener('click', (e) => {
      addOrRemoveWishList(content as Movie)
      e.stopPropagation();
    })

    // Stop listenning when component is unmont
    return () => {
      currentWishIconRef?.removeEventListener('click', () => { })
    }
  }, [])

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