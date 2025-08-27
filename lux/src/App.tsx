import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import MovieDetailPage from './pages/movie-detail/MovieDetailPage'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import Header from './components/header/Header'
import WishListPage from './pages/wish-list/WishList'

const queryClient = new QueryClient()

function App() {

  return (
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
          </Routes>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  )
}

export default App
