import React, { useRef } from 'react'
import './Carousel.scss'

interface CarouselProps {
  isLoading: boolean,
  isError: boolean,
  title: string,
  children?: React.ReactNode
}

const Carousel: React.FC<CarouselProps> = ({ title, isLoading, isError, children }) => {
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
      <h2 className='carousel-title'>{title}</h2>
      <div className="carousel-placeholder">
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
      </div>
    </section>
  )
}

export default Carousel