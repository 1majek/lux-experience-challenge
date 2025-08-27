import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '../api/movies/interfaces'

interface MovieState {
  movie: Movie | null
}

const initialState: MovieState = {
  movie: null,
}

const movieSlice = createSlice({
  name: 'selectedMovies',
  initialState,
  reducers: {
    addSelectedMovie: (state, action: PayloadAction<Movie>) => {
      state.movie = action.payload
    }
  },
})

export const { addSelectedMovie } = movieSlice.actions
export default movieSlice.reducer