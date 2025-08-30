import { useDispatch, useSelector } from "react-redux"
import type { RootState } from '../store'
import type { Movie } from "../api/movies/interfaces"
import { addToWishList, clearWishList as clearWishListContext, removeFromWishList } from "../store/wishListSlice"
import { useCallback } from "react"

export const useWishListContext = () => {
  const dispatch = useDispatch()
  const wishList = useSelector((state: RootState) => state.wishList.movies)

  const addWishList = (movie: Movie) => {
    dispatch(addToWishList(movie))
  }

  const removeWishList = (id: number) => {
    dispatch(removeFromWishList(id))
  }

  const clearWishList = () => {
    dispatch(clearWishListContext())
  }

  const isInWishList = useCallback((id: number) => {
    return wishList.some((movie) => movie.id === id)
  }, [wishList])

  const addOrRemoveWishList = (movie: Movie) => {
    if (isInWishList(movie.id)) {
      removeWishList(movie.id)
      return false
    }
    addWishList(movie)
    return true
  }

  return { wishList, isInWishList, addOrRemoveWishList, removeWishList, clearWishList }
}