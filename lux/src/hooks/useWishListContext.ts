import { useDispatch, useSelector } from "react-redux"
import type { RootState } from '../store'
import type { Movie } from "../api/movies/interfaces"
import { addToWishList, clearWishList as clearWishListContext, removeFromWishList } from "../store/wishListSlice"

export const useWishListContext = () => {
  const dispatch = useDispatch()

  const addWishList = (movie: Movie) => {
    dispatch(addToWishList(movie))
  }

  const removeWishList = (id: number) => {
    dispatch(removeFromWishList(id))
  }

  const clearWishList = () => {
    dispatch(clearWishListContext())
  }

  const wishList = useSelector((state: RootState) => state.wishList.movies)

  return { wishList, addWishList, removeWishList, clearWishList }
}