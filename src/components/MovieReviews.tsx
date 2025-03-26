
import React, { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { MovieReview, formatDate } from "../services/movieService";

interface MovieReviewsProps {
  reviews: MovieReview[];
  isLoading: boolean;
}

const MovieReviews: React.FC<MovieReviewsProps> = ({ reviews, isLoading }) => {
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);

  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId) 
        : [...prev, reviewId]
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4 mt-6">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="space-y-4 mt-6">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-muted-foreground">No reviews available for this movie.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6 animate-fade-in">
      <h3 className="text-xl font-semibold">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => {
          const isExpanded = expandedReviews.includes(review.id);
          
          return (
            <div key={review.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{review.author}</h4>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(review.created_at)}
                  </p>
                </div>
                {review.author_details.rating && (
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium">{review.author_details.rating}/10</span>
                  </div>
                )}
              </div>
              <p className={`text-sm text-muted-foreground mt-2 ${isExpanded ? '' : 'line-clamp-4'}`}>
                {review.content}
              </p>
              {review.content.length > 300 && (
                <button 
                  onClick={() => toggleReviewExpansion(review.id)}
                  className="mt-2 flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  {isExpanded ? 'Show less' : 'Read more'} 
                  <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieReviews;
