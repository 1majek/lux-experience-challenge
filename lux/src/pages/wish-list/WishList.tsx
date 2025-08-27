import React from 'react'
import Card from '../../components/card/Card'
import { useWishListContext } from '../../hooks/useWishListContext'
import './wishlist.scss'
import { Link } from 'react-router-dom'

const WishListPage: React.FC = () => {
  const { wishList, clearWishList, removeWishList } = useWishListContext()

  return (
    <div className="wishlist-page">
      <h1>My Wish List</h1>
      {wishList.length === 0 ? (
        <div className='empty-wishlist'>
          <p>Your wish list is empty. Add some movies to see them here!</p>
          <Link className='browse-movies-btn' to='/'>Browse Movies</Link>
        </div>
      ) : (
        <>
          <button className="clear-wishlist-btn" onClick={() => clearWishList()}>Clear Wish List</button>
          <div className="wishlist-movies">
            {wishList.map(movie => (
              <div key={movie.id} className="wishlist-item">
                <Card content={movie} />
                <button className="remove-btn" onClick={() => removeWishList(movie.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default WishListPage