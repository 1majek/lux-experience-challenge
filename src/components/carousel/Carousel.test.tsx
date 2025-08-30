import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import Carousel from './Carousel'
import { useCarousel } from './useCarousel'

// Mock the custom hook
vi.mock('./useCarousel')

// Mock the SCSS import
vi.mock('./Carousel.scss', () => ({
  default: {},
}))

// Mock the Loading component for isolation
vi.mock('../loading/Loading', () => ({
  default: () => <div role="status">Loading...</div>,
}))

describe('Carousel component', () => {
  const scrollMock = vi.fn()

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Provide a mock implementation for the useCarousel hook
    (useCarousel as Mock).mockReturnValue({
      scrollRef: { current: null }, // A simple ref mock is sufficient
      scroll: scrollMock,
    })
  })

  it('should render the loading component when isLoading is true', () => {
    render(
      <Carousel isLoading={true} title="">
        <div>Item 1</div>
        <div>Item 2</div>
      </Carousel>
    )

    // Check for the loading component's presence
    expect(screen.getByRole('status')).toHaveTextContent('Loading...')

    // Ensure carousel controls and children container are not rendered
    expect(screen.queryByRole('button', { name: /scroll/i })).not.toBeInTheDocument()
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
  })

  it('should render the title, children, and controls when not loading', () => {
    const title = 'Featured Destinations'
    render(
      <Carousel isLoading={false} title={title}>
        <div>Item 1</div>
        <div>Item 2</div>
      </Carousel>,
    )

    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /scroll left/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /scroll right/i })).toBeInTheDocument()
  })

  it('should call the scroll function when control buttons are clicked', () => {
    render(<Carousel isLoading={false} title="Interaction Test" />)

    fireEvent.click(screen.getByRole('button', { name: /scroll left/i }))
    expect(scrollMock).toHaveBeenCalledWith('left')

    fireEvent.click(screen.getByRole('button', { name: /scroll right/i }))
    expect(scrollMock).toHaveBeenCalledWith('right')

    expect(scrollMock).toHaveBeenCalledTimes(2)
  })
})
