/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import Card from './Card'
import { useCard } from './useCard'
import type { CastMember, Movie } from '../../api/movies/interfaces'

// Mock the custom hook `useCard`
vi.mock('./useCard')

// Mock the WishlistIcon component for isolation.
// Use forwardRef because the original component receives a ref.
vi.mock('../WishlistIcon', () => ({
  default: React.forwardRef((props: any, ref: any) => (
    <div data-testid="wishlist-icon" {...props} ref={ref} />
  )),
}))

// Mock the SCSS import
vi.mock('./Card.scss', () => ({
  default: {},
}))

describe('Card component', () => {
  const mockHandleCardClick = vi.fn()
  const mockHandleKeyDown = vi.fn()

  // Mock data for a movie and a cast member
  const movieContent: Pick<Movie, 'id' | 'title' | 'poster_path'> = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
  }

  const castMemberContent: CastMember = {
    id: 101,
    name: 'Test Actor',
    profile_path: '/test-actor.jpg',
    adult: false,
    gender: 1,
    known_for_department: 'Acting',
    original_name: 'Test Original Actor',
    popularity: 10,
    cast_id: 1,
    character: 'Test Character',
    credit_id: '1',
    order: 1,
  }

  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks()
  })

  describe('when content is a Movie', () => {
    it('should render movie details and handle interactions', () => {
      (useCard as Mock).mockReturnValue({
        normalized: { title: 'Test Movie', poster_path: '/test-poster.jpg' },
        handleCardClick: mockHandleCardClick,
        handleKeyDown: mockHandleKeyDown,
        imageUrl: 'https://image.tmdb.org/t/p/w500/test-poster.jpg',
        isMovie: () => true,
        currentPage: '/',
        wishIconRef: { current: null },
        movieInWishList: false,
      })

      render(<Card content={movieContent} />)

      // Check for title and poster image
      expect(screen.getByText('Test Movie')).toBeInTheDocument()
      const poster = screen.getByRole('img', { name: /test movie/i })
      expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/test-poster.jpg')

      // Check for accessibility attributes
      const cardElement = screen.getByRole('button', { name: /test movie/i })
      expect(cardElement).toHaveAttribute('tabIndex', '0')
      expect(cardElement).toHaveAttribute('title', 'Test Movie')

      // Check for interactions
      fireEvent.click(cardElement)
      expect(mockHandleCardClick).toHaveBeenCalledTimes(1)

      fireEvent.keyDown(cardElement, { key: 'Enter' })
      expect(mockHandleKeyDown).toHaveBeenCalledTimes(1)
    })

    it('should render WishlistIcon when not on wishlist page', () => {
      (useCard as Mock).mockReturnValue({
        normalized: { title: 'Test Movie' },
        isMovie: () => true,
        currentPage: '/',
      })

      render(<Card content={movieContent} />)
      expect(screen.getByTestId('wishlist-icon')).toBeInTheDocument()
    })

    it('should NOT render WishlistIcon when on wishlist page', () => {
      (useCard as Mock).mockReturnValue({
        normalized: { title: 'Test Movie' },
        isMovie: () => true,
        currentPage: 'wishlist',
      })

      render(<Card content={movieContent} />)
      expect(screen.queryByTestId('wishlist-icon')).not.toBeInTheDocument()
    })

    it('should render filled WishlistIcon if movie is in wishlist', () => {
      (useCard as Mock).mockReturnValue({
        normalized: { title: 'Test Movie' },
        isMovie: () => true,
        currentPage: '/',
        movieInWishList: true,
      })

      render(<Card content={movieContent} categoryColor="#ff0000" />)
      const icon = screen.getByTestId('wishlist-icon')
      expect(icon).toHaveAttribute('opacity', '1')
      expect(icon).toHaveAttribute('fill', '#ff0000')
    })
  })

  describe('when content is a CastMember', () => {
    it('should render cast member details and NOT render WishlistIcon', () => {
      (useCard as Mock).mockReturnValue({
        normalized: { title: 'Test Actor', poster_path: '/test-actor.jpg' },
        imageUrl: 'https://image.tmdb.org/t/p/w500/test-actor.jpg',
        isMovie: () => false,
      })

      render(<Card content={castMemberContent} />)

      expect(screen.getByText('Test Actor')).toBeInTheDocument()
      expect(screen.getByRole('img', { name: /test actor/i })).toBeInTheDocument()
      expect(screen.queryByTestId('wishlist-icon')).not.toBeInTheDocument()
    })
  })
})
