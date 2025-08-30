import React from 'react'
import MovieCarousel from '../../components/MovieCarousel'
import './Home.scss'
import { useHome } from './useHome'

const Home: React.FC = () => {
  const { carousels } = useHome()

  return (
    <div className="home-page">
      <h1>Browse Movies</h1>
      {carousels.map((carousel) => (
        <MovieCarousel key={carousel.title} {...carousel} />
      ))}
    </div>
  )
}

export default Home