
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Movie, getPosterUrl, formatDate } from "../services/movieService";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = getPosterUrl(movie.poster_path);
  
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group relative overflow-hidden rounded-lg bg-card 
                transition-all duration-300 ease-in-out hover:shadow-lg 
                hover:shadow-black/5 hover:-translate-y-1 animate-scale-in"
    >
      <div className="aspect-poster overflow-hidden bg-muted">
        <img 
          src={posterUrl} 
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover transition-transform duration-500 
                    ease-in-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-medium text-white/90">
            {movie.release_date ? formatDate(movie.release_date).split(" ")[2] : "TBA"}
          </span>
          <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium text-white">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <h3 className="text-sm font-medium text-white truncate">{movie.title}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
