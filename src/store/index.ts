import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import wishListReducer from './wishListSlice'
import movieReducer from './movieSlice'

const rootReducer = combineReducers({
  wishList: wishListReducer,
  selectedMovie: movieReducer,
})

type PreloadedState<T> = T

export const createStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>