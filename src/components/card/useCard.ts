import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMovieContext } from "../../hooks/useMovieContext";
import { useWishListContext } from "../../hooks/useWishListContext";
import { getImageUrl } from "../../utils";
import placeholderImage from './../../assets/placeholder-img.png'
import type { CastMember, Movie } from "../../api/movies/interfaces";

type Content = Pick<Movie, 'id' | 'title' | 'poster_path'> | CastMember;

interface Props {
  content: Content,
  category?: string,
}

// Type guard to check if content is a Movie
function isMovie(content: Content): content is Pick<Movie, 'id' | 'title' | 'poster_path'> {
  return 'title' in content;
}

export const useCard = ({ content, category }: Props) => {
  const navigate = useNavigate()
  const location = useLocation();
  const { addMovie } = useMovieContext()
  const wishIconRef = useRef<SVGSVGElement | null>(null)
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
    return isInWishList(normalized.id)
  }, [isInWishList, normalized.id])

  useEffect(() => {
    const currentWishIconRef = wishIconRef?.current;
    currentWishIconRef?.addEventListener('click', (e) => {
      addOrRemoveWishList(content as Movie)
      e.stopPropagation();
    })

    // Stop listenning when component is unmont
    return () => {
      currentWishIconRef?.removeEventListener('click', () => { })
    }
  }, [addOrRemoveWishList, content])

  return {
    currentPage,
    normalized,
    imageUrl,
    handleCardClick,
    handleKeyDown,
    wishIconRef,
    movieInWishList,
    isMovie
  }

}