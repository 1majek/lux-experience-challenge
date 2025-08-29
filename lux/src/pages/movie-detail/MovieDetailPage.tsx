import React, { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useMovieDetailApi } from '../../api/movies/movie-detail/useMovieDetailApi'
import { popularMoviesTitle, topRatedMoviesTitle, upcomingMoviesTitle } from '../../utils'
import './MovieDetail.scss'
import Carousel from '../../components/carousel/Carousel'
import Card from '../../components/card/Card'
import { useMovieContext } from '../../hooks/useMovieContext'
import { useWishListContext } from '../../hooks/useWishListContext'
import WishlistIcon from '../../components/WishlistIcon'

const MovieDetailPage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id?: string }>()
  const { category } = location.state

  const { selectedMovie } = useMovieContext()
  const { wishList, addWishList, removeWishList } = useWishListContext()

  const { movieDetail, isLoading, error } = useMovieDetailApi(id)

  const isInWishList = useMemo(() => {
    return wishList.some((movie) => movie.id === Number(id))
  }, [id, wishList])

  const handleAddToWishList = () => {
    if (isInWishList) {
      removeWishList(Number(id))
      return
    }

    if (selectedMovie) {
      addWishList(selectedMovie)
    }
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
  if (error || !movieDetail) return <div>Movie not found.</div>

  // Set dynamic background style
  const backgroundStyle = movieDetail.backdrop_path
    ? {
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
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
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />

          <div className="movie-detail-info">
            <h1>{movieDetail.title}</h1>
            <p className="movie-detail-overview">{movieDetail.overview}</p>
            <p><strong>Release Date:</strong> {movieDetail.release_date}</p>
            <p><strong>Rating:</strong> {movieDetail.vote_average} / 10</p>
            <div className='action-buttons'>
              <button className="add-to-wishlist-btn" onClick={handleAddToWishList}>
                {isInWishList ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              <WishlistIcon onClick={handleAddToWishList} className='wishlist-icon' height={30} width={30} strokeWidth='2' fill={isInWishList ? '#cc2e2e' : 'none'} />
            </div>
          </div>
        </div>
      </div>

      <Carousel title='Casts' isLoading={isLoading} isError={Boolean(error)}>
        {movieDetail?.credits.cast.map((cast) => (
          <Card key={cast.id} content={cast} />
        ))}
      </Carousel>

    </div>
  )
}

export default MovieDetailPage