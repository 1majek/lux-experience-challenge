import React from 'react';
import Carousel from './carousel/Carousel';
import ErrorDisplay from './error/ErrorDisplay/ErrorDisplay';
import Card from './card/Card';
import type { Movie } from '../api/movies/interfaces';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies, isLoading, isError }) => {
  if (isError) {
    return <ErrorDisplay message={`Failed to load ${title}. Please try again later.`} />;
  }

  return (
    <Carousel title={title} isLoading={isLoading}>
      {movies.map((movie) => (
        <Card key={movie.id} content={movie} category={title} />
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
