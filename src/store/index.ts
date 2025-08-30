import { configureStore } from '@reduxjs/toolkit'
import wishListReducer from './wishListSlice'
import movieReducer from './movieSlice'

export const store = configureStore({
  reducer: {
    wishList: wishListReducer,
    selectedMovie: movieReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch