import { Link } from 'react-router-dom';

import './header.scss';
import { useWishListContext } from '../../hooks/useWishListContext';
import WishlistIcon from '../WishlistIcon';

const Header = () => {
  const { wishList } = useWishListContext()

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <h1>Lux Experience</h1>
        </Link>
      </div>
      <nav className="header__nav">
        <Link to="/wishlist" className="header__wishlist-link">
          <div className="header__wishlist-icon-container">
            <WishlistIcon />
            {wishList.length > 0 && (
              <span className="header__wishlist-count">{wishList.length}</span>
            )}
          </div>
          <span className="header__wishlist-text">Wish List</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
