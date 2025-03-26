
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getMovieDetails, getMovieReviews, MovieDetail as MovieDetailType, MovieReview } from "../services/movieService";
import MovieDetail from "../components/MovieDetail";
import LoadingState from "../components/LoadingState";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;
      
      setLoading(true);
      setLoadingReviews(true);
      setError(null);
      
      try {
        const movieId = parseInt(id, 10);
        const [movieData, reviewsData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieReviews(movieId)
        ]);
        
        if (movieData) {
          setMovie(movieData);
          if (reviewsData) {
            setReviews(reviewsData.results);
          }
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        setError("Failed to load movie details");
        console.error(err);
      } finally {
        setLoading(false);
        setLoadingReviews(false);
      }
    };
    
    fetchMovieData();
  }, [id]);
  
  return (
    <div className="min-h-screen bg-background">
      <header className="backdrop-blur-sm bg-background/80 sticky top-0 z-10 border-b border-border/40">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center py-4">
            <Link 
              to="/"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Movies
            </Link>
          </div>
        </div>
      </header>
      
      <main>
        {loading ? (
          <LoadingState message="Loading movie details..." />
        ) : error ? (
          <div className="container max-w-7xl mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-muted-foreground">{error}</p>
            <Link 
              to="/"
              className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        ) : movie ? (
          <MovieDetail movie={movie} reviews={reviews} isLoadingReviews={loadingReviews} />
        ) : (
          <div className="container max-w-7xl mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
            <p className="text-muted-foreground">
              The movie you are looking for could not be found.
            </p>
            <Link 
              to="/"
              className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        )}
      </main>
      
      <footer className="py-6 border-t border-border/40 mt-auto">
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

export default MoviePage;
