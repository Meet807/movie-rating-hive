
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Movie, getTrendingMovies, searchMovies } from "../services/movieService";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import LoadingState from "../components/LoadingState";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = searchQuery
        ? await searchMovies(searchQuery, page)
        : await getTrendingMovies(page);
      
      if (response) {
        setMovies(prevMovies => page > 1 ? [...prevMovies, ...response.results] : response.results);
        setTotalPages(response.total_pages);
      } else {
        setError("No movies found. Try a different search term.");
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial fetch and when search or page changes
  useEffect(() => {
    fetchMovies();
  }, [searchQuery, page]);
  
  // Update search params when search query changes
  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);
  
  // Handle new search
  const handleSearch = (query: string) => {
    setMovies([]);
    setPage(1);
    setSearchQuery(query);
  };
  
  // Load more movies
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="backdrop-blur-sm bg-background/80 sticky top-0 z-10 border-b border-border/40 py-4">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              MovieDB
            </h1>
            <div className="text-sm text-muted-foreground">
              Database Management Project
            </div>
          </div>
        </div>
      </header>
      
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            {searchQuery ? "Search Results" : "Trending Movies"}
          </h2>
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        </div>
        
        {loading && movies.length === 0 ? (
          <LoadingState />
        ) : error ? (
          <div className="text-center text-muted-foreground my-16">{error}</div>
        ) : movies.length === 0 ? (
          <div className="text-center text-muted-foreground my-16">
            No movies found. Try a different search term.
          </div>
        ) : (
          <>
            <div className="movie-grid">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            
            {page < totalPages && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full
                            hover:bg-secondary/80 transition-colors disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="py-6 border-t border-border/40 mt-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Movie Database Management Project</p>
            <p className="mt-1">Data provided by The Movie Database (TMDB)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
