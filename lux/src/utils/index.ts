export const popularMoviesTitle = "Popular Movies";
export const topRatedMoviesTitle = "Top Rated Movies";
export const upcomingMoviesTitle = "Upcoming Movies";

export const getImageUrl = (path: string, size: string = "original") => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}