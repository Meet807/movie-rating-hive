
import React from "react";
import { Star, Clock, Calendar, Info } from "lucide-react";
import { MovieDetail as MovieDetailType, getBackdropUrl, getPosterUrl, formatRuntime, formatDate, formatNumber } from "../services/movieService";

interface MovieDetailProps {
  movie: MovieDetailType;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const posterUrl = getPosterUrl(movie.poster_path, "w500");
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  
  return (
    <div className="animate-fade-in">
      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative w-full h-[40vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>
      )}
      
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Movie Info Section */}
        <div className="flex flex-col md:flex-row gap-8 -mt-32 relative z-10 animate-slide-up">
          {/* Poster */}
          <div className="w-full max-w-[300px] mx-auto md:mx-0 aspect-poster overflow-hidden rounded-lg border border-border/50 shadow-xl bg-card">
            <img 
              src={posterUrl} 
              alt={`${movie.title} poster`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Details */}
          <div className="flex-1 pt-4 md:pt-32">
            <div className="space-y-4">
              {movie.tagline && (
                <p className="text-muted-foreground italic">{movie.tagline}</p>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-balance">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {movie.genres.map(genre => (
                  <span 
                    key={genre.id}
                    className="text-xs bg-secondary px-2 py-1 rounded-full text-secondary-foreground"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{movie.vote_average.toFixed(1)} ({movie.vote_count} votes)</span>
                </div>
                
                {movie.runtime > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                
                {movie.release_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span>{movie.status}</span>
                </div>
              </div>
              
              {/* Overview */}
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Overview</h3>
                <p className="text-muted-foreground leading-relaxed">{movie.overview || "No overview available."}</p>
              </div>
              
              {/* Production Info */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {movie.budget > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Budget</h4>
                    <p className="text-foreground">{formatNumber(movie.budget)}</p>
                  </div>
                )}
                
                {movie.revenue > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Revenue</h4>
                    <p className="text-foreground">{formatNumber(movie.revenue)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
