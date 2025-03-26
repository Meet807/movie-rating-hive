
import { toast } from "sonner";

// API Constants
const API_KEY = "3e12bf8f98eb52443908c00fdc5cb31a";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p";

// Types for our API responses
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

export interface MovieDetail extends Omit<Movie, "genre_ids"> {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
  revenue: number;
  budget: number;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

// Helper function to handle API errors
const handleApiError = (error: unknown, message: string) => {
  console.error(error);
  toast.error(message);
  return null;
};

// Get poster image URL with appropriate size
export const getPosterUrl = (path: string | null, size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w342") => {
  if (!path) return "/placeholder.svg";
  return `${IMG_BASE_URL}/${size}${path}`;
};

// Get backdrop image URL
export const getBackdropUrl = (path: string | null, size: "w300" | "w780" | "w1280" | "original" = "w1280") => {
  if (!path) return null;
  return `${IMG_BASE_URL}/${size}${path}`;
};

// Get trending movies
export const getTrendingMovies = async (page = 1): Promise<MovieResponse | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );
    if (!response.ok) throw new Error("Failed to fetch trending movies");
    return await response.json();
  } catch (error) {
    return handleApiError(error, "Couldn't load trending movies");
  }
};

// Search movies by query
export const searchMovies = async (query: string, page = 1): Promise<MovieResponse | null> => {
  if (!query.trim()) return null;
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    if (!response.ok) throw new Error("Failed to search movies");
    return await response.json();
  } catch (error) {
    return handleApiError(error, "Couldn't search for movies");
  }
};

// Get movie details by ID
export const getMovieDetails = async (id: number): Promise<MovieDetail | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch movie details");
    return await response.json();
  } catch (error) {
    return handleApiError(error, "Couldn't load movie details");
  }
};

// Format runtime from minutes to hours and minutes
export const formatRuntime = (minutes: number): string => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Format date to more readable format
export const formatDate = (dateString: string): string => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", 
    day: "numeric"
  });
};

// Format large numbers with commas
export const formatNumber = (num: number): string => {
  if (!num) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(num);
};
