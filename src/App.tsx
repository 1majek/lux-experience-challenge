import './App.css'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import MovieDetailPage from './pages/movie-detail/MovieDetail'
import Header from './components/header/Header'
import WishListPage from './pages/wish-list/WishList'
import ErrorBoundary from './components/error/ErrorBoundary'
import ErrorBoundaryFallback from './components/error/ErrorBoundaryFallback/ErrorBoundaryFallback'

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}

export default App
