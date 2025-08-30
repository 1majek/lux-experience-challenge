import React from 'react'
import './Carousel.scss'
import Loading from '../loading/Loading'
import { useCarousel } from './useCarousel'

interface CarouselProps {
  isLoading: boolean,
  title: string,
  children?: React.ReactNode
}

const Carousel: React.FC<CarouselProps> = ({ isLoading, title, children }) => {
  const { scrollRef, scroll } = useCarousel()

  return (
    <section className="carousel-section">
      <h2 className='carousel-title'>{title}</h2>
      <div className="carousel-placeholder">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="carousel">
            <button className="carousel-btn left" onClick={() => scroll('left')} aria-label="Scroll left">
              &#8592;
            </button>
            <div className="carousel-track" ref={scrollRef}>
              {children}
            </div>
            <button className="carousel-btn right" onClick={() => scroll('right')} aria-label="Scroll right">
              &#8594;
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Carousel