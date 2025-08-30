import React, { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useMovieDetailApi } from '../../api/movies/movie-detail/useMovieDetailApi'
import { getImageUrl, popularMoviesTitle, topRatedMoviesTitle, upcomingMoviesTitle } from '../../utils'
import Carousel from '../../components/carousel/Carousel'
import Card from '../../components/card/Card'
import { useWishListContext } from '../../hooks/useWishListContext'
import WishlistIcon from '../../components/WishlistIcon'
import Loading from '../../components/loading/Loading'
import ErrorDisplay from '../../components/error/ErrorDisplay/ErrorDisplay'
import placeholderImage from '../../assets/placeholder-img.png'
import { useMovieContext } from '../../hooks/useMovieContext'
import './MovieDetail.scss'

const MovieDetailPage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id?: string }>()
  const category = location.state?.category

  const { wishList, addOrRemoveWishList } = useWishListContext()
  const { selectedMovie } = useMovieContext()

  const { movieDetail, isLoading, error } = useMovieDetailApi(id)

  const isInWishList = useMemo(() => {
    return wishList.some((movie) => movie.id === Number(id))
  }, [id, wishList])

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

  if (isLoading) {
    return <Loading />;
  }

  if (error || !movieDetail) {
    return <ErrorDisplay message="Could not load movie. Please try again later." />;
  }

  // Set dynamic background style
  const backgroundStyle = movieDetail.backdrop_path
    ? {
      backgroundImage: `url(${getImageUrl(movieDetail.backdrop_path)})`,
      backgroundSize: categoryClass === "popular" ? 'auto' : "cover",
      backgroundPosition: categoryClass === "upcoming" ? 'top' : 'bottom',
      backgroundRepeat: 'no-repeat',
    }
    : {}

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-header" style={backgroundStyle}>
        <div className='movie-detail-container'>
          <img
            className="movie-detail-poster"
            src={movieDetail.poster_path ? `${getImageUrl(movieDetail.poster_path, 'w500')}` : placeholderImage}
            alt={movieDetail.title}
          />

          <div className="movie-detail-info">
            <h1>{movieDetail.title}</h1>
            <p className="movie-detail-overview">{movieDetail.overview}</p>
            <p><strong>Release Date:</strong> {movieDetail.release_date}</p>
            <p><strong>Rating:</strong> {movieDetail.vote_average.toFixed(1)} / 10</p>
            <div className='action-buttons'>
              <button className={`add-to-wishlist-btn ${categoryClass}`} onClick={() => selectedMovie && addOrRemoveWishList(selectedMovie)}>
                <span>{isInWishList ? 'In Wishlist' : 'Add to Wishlist'}</span>
                <WishlistIcon
                  className="wishlist-icon-btn"
                  height={18}
                  width={18}
                  strokeWidth='2'
                  fill={isInWishList ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Carousel title='Casts' isLoading={isLoading}>
        {movieDetail?.credits.cast.map((cast) => (
          <Card key={cast.id} content={cast} />
        ))}
      </Carousel>

    </div>
  )
}

export default MovieDetailPage