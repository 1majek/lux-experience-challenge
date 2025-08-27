import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom'
import MovieDetailPage from './pages/movie-detail/MovieDetailPage'
import { StrictMode } from 'react'

const queryClient = new QueryClient()

function App() {

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App
