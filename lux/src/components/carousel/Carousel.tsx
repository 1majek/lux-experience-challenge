import React, { useRef } from 'react'
import './Carousel.scss'
import type { Movie } from '../../api/movies/interfaces'
import MovieCard from '../movie-card/MovieCard'

interface CarouselProps {
  movies: Movie[],
  isLoading: boolean,
  isError: boolean,
  title?: string
}

const Carousel: React.FC<CarouselProps> = ({ movies, title, isLoading, isError }) => {
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

  if (isLoading) return <div>Loading {title}...</div>
  if (isError) return <div>Error loading {title}.</div>

  return (
    <section className="carousel-section">
      <h2>{title}</h2>
      <div className="carousel-placeholder">
        <div className="carousel">
          <button className="carousel-btn left" onClick={() => scroll('left')} aria-label="Scroll left">
            &#8592;
          </button>
          <div className="carousel-track" ref={scrollRef}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <button className="carousel-btn right" onClick={() => scroll('right')} aria-label="Scroll right">
            &#8594;
          </button>
        </div>
      </div>
    </section>
  )
}

export default Carousel