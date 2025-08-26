import React, { useRef } from 'react'
import './Carousel.scss'

export interface Movie {
  id: number
  title: string
  poster_path: string
  [key: string]: string | number | undefined
}

interface CarouselProps {
  movies: Movie[]
  onMovieClick: (movie: Movie) => void
  title?: string
}

const Carousel: React.FC<CarouselProps> = ({ movies, onMovieClick, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="carousel">
      {title && <h3 className="carousel-title">{title}</h3>}
      <button className="carousel-btn left" onClick={() => scroll('left')} aria-label="Scroll left">
        &#8592;
      </button>
      <div className="carousel-track" ref={scrollRef}>
        {movies.map((movie) => (
          <div
            className="carousel-item"
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            tabIndex={0}
            role="button"
            aria-label={movie.title}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="carousel-poster"
            />
            <div className="carousel-title">{movie.title}</div>
          </div>
        ))}
      </div>
      <button className="carousel-btn right" onClick={() => scroll('right')} aria-label="Scroll right">
        &#8594;
      </button>
    </div>
  )
}

export default Carousel