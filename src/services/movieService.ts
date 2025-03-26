
import { toast } from "sonner";

// Types for our movie data
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

export interface MovieReview {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    rating: number;
    avatar_path: string | null;
    username: string;
  };
}

export interface MovieReviewsResponse {
  results: MovieReview[];
  total_pages: number;
  total_results: number;
  page: number;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

// Helper function to handle errors
const handleApiError = (error: unknown, message: string) => {
  console.error(error);
  toast.error(message);
  return null;
};

// Get poster image URL
export const getPosterUrl = (path: string | null, size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w342") => {
  if (!path) return "/placeholder.svg";
  return path;
};

// Get backdrop image URL
export const getBackdropUrl = (path: string | null, size: "w300" | "w780" | "w1280" | "original" = "w1280") => {
  if (!path) return null;
  return path;
};

// Collection of different Unsplash image URLs for movie posters
const posterImages = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750", // Movie poster 1
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750", // Movie poster 2
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&h=750", // Movie poster 3
  "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=500&h=750", // Movie poster 4
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&h=750", // Movie poster 5
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=750", // Movie poster 6
  "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=500&h=750", // Movie poster 7
  "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=750", // Movie poster 8
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750", // Movie poster 9
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750", // Movie poster 10
  "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&h=750", // Movie poster 11
  "https://images.unsplash.com/photo-1512070679279-8988d32161be?w=500&h=750", // Movie poster 12
  "https://images.unsplash.com/photo-1486693128850-a77436e7ba3c?w=500&h=750", // Movie poster 13
  "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=500&h=750", // Movie poster 14
  "https://images.unsplash.com/photo-1614846384571-1e76d94cc0e4?w=500&h=750", // Movie poster 15
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750", // Movie poster 16
  "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=500&h=750", // Movie poster 17
  "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=500&h=750", // Movie poster 18
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&h=750", // Movie poster 19
  "https://images.unsplash.com/photo-1600431521340-491eca880813?w=500&h=750", // Movie poster 20
];

// Collection of different Unsplash image URLs for movie backdrops
const backdropImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1280&h=720", // Backdrop 1
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&h=720", // Backdrop 2
  "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=1280&h=720", // Backdrop 3
  "https://images.unsplash.com/photo-1562329265-95a6d7a83440?w=1280&h=720", // Backdrop 4
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1280&h=720", // Backdrop 5
];

// Local movie data for famous Hollywood and Bollywood movies
const localMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: posterImages[0],
    backdrop_path: backdropImages[0],
    vote_average: 9.3,
    vote_count: 21000,
    release_date: "1994-09-23",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre_ids: [18, 80]
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: posterImages[1],
    backdrop_path: backdropImages[1],
    vote_average: 9.2,
    vote_count: 15700,
    release_date: "1972-03-14",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre_ids: [18, 80]
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: posterImages[2],
    backdrop_path: backdropImages[2],
    vote_average: 9.0,
    vote_count: 23500,
    release_date: "2008-07-16",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre_ids: [18, 28, 80]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster_path: posterImages[3],
    backdrop_path: backdropImages[3],
    vote_average: 8.9,
    vote_count: 21500,
    release_date: "1994-10-14",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre_ids: [53, 80]
  },
  {
    id: 5,
    title: "Fight Club",
    poster_path: posterImages[4],
    backdrop_path: backdropImages[4],
    vote_average: 8.8,
    vote_count: 18500,
    release_date: "1999-10-15",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    genre_ids: [18]
  },
  {
    id: 6,
    title: "Inception",
    poster_path: posterImages[5],
    backdrop_path: backdropImages[0],
    vote_average: 8.8,
    vote_count: 20500,
    release_date: "2010-07-16",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre_ids: [28, 878]
  },
  {
    id: 7,
    title: "The Matrix",
    poster_path: posterImages[6],
    backdrop_path: backdropImages[1],
    vote_average: 8.7,
    vote_count: 19500,
    release_date: "1999-03-31",
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    genre_ids: [28, 878]
  },
  {
    id: 8,
    title: "Dilwale Dulhania Le Jayenge",
    poster_path: posterImages[7],
    backdrop_path: backdropImages[2],
    vote_average: 8.9,
    vote_count: 3500,
    release_date: "1995-10-20",
    overview: "When Raj meets Simran in Europe, it isn't love at first sight but when Simran moves to India for an arranged marriage, love makes its presence felt.",
    genre_ids: [10749, 35, 18]
  },
  {
    id: 9,
    title: "3 Idiots",
    poster_path: posterImages[8],
    backdrop_path: backdropImages[3],
    vote_average: 8.6,
    vote_count: 3200,
    release_date: "2009-12-25",
    overview: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them 'idiots'.",
    genre_ids: [35, 18]
  },
  {
    id: 10,
    title: "Lagaan",
    poster_path: posterImages[9],
    backdrop_path: backdropImages[4],
    vote_average: 8.3,
    vote_count: 1800,
    release_date: "2001-06-15",
    overview: "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
    genre_ids: [18, 10749, 28]
  },
  {
    id: 11,
    title: "Sholay",
    poster_path: posterImages[10],
    backdrop_path: backdropImages[0],
    vote_average: 8.4,
    vote_count: 1700,
    release_date: "1975-08-15",
    overview: "After his family is murdered by a notorious and ruthless bandit, a former police officer enlists the services of two outlaws to capture the bandit.",
    genre_ids: [28, 12, 18]
  },
  {
    id: 12,
    title: "Interstellar",
    poster_path: posterImages[11],
    backdrop_path: backdropImages[1],
    vote_average: 8.6,
    vote_count: 27500,
    release_date: "2014-11-05",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre_ids: [12, 18, 878]
  },
  {
    id: 13,
    title: "Forrest Gump",
    poster_path: posterImages[12],
    backdrop_path: backdropImages[2],
    vote_average: 8.8,
    vote_count: 20900,
    release_date: "1994-07-06",
    overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    genre_ids: [35, 18]
  },
  {
    id: 14,
    title: "PK",
    poster_path: posterImages[13],
    backdrop_path: backdropImages[3],
    vote_average: 8.2,
    vote_count: 2800,
    release_date: "2014-12-19",
    overview: "An alien on Earth loses the only device he can use to communicate with his spaceship. His innocent nature and child-like questions force the country to evaluate their religious beliefs, superstitions and duplicitous religious practices.",
    genre_ids: [35, 18, 878]
  },
  {
    id: 15,
    title: "The Lord of the Rings: The Return of the King",
    poster_path: posterImages[14],
    backdrop_path: backdropImages[4],
    vote_average: 8.9,
    vote_count: 18700,
    release_date: "2003-12-17",
    overview: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    genre_ids: [12, 14, 28]
  },
  {
    id: 16,
    title: "Kabhi Khushi Kabhie Gham",
    poster_path: posterImages[15],
    backdrop_path: backdropImages[0],
    vote_average: 7.9,
    vote_count: 2100,
    release_date: "2001-12-14",
    overview: "A young man and woman - both of Indian descent but born and raised in Britain - fall in love despite their parents' wishes for them to have arranged marriages.",
    genre_ids: [10749, 18, 35]
  },
  {
    id: 17,
    title: "The Avengers",
    poster_path: posterImages[16],
    backdrop_path: backdropImages[1],
    vote_average: 8.0,
    vote_count: 26100,
    release_date: "2012-05-04",
    overview: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    genre_ids: [28, 12, 878]
  },
  {
    id: 18,
    title: "Bahubali: The Beginning",
    poster_path: posterImages[17],
    backdrop_path: backdropImages[2],
    vote_average: 8.1,
    vote_count: 1500,
    release_date: "2015-07-10",
    overview: "In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring people.",
    genre_ids: [28, 12, 14]
  },
  {
    id: 19,
    title: "Joker",
    poster_path: posterImages[18],
    backdrop_path: backdropImages[3],
    vote_average: 8.4,
    vote_count: 19800,
    release_date: "2019-10-04",
    overview: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
    genre_ids: [80, 53, 18]
  },
  {
    id: 20,
    title: "Gully Boy",
    poster_path: posterImages[19],
    backdrop_path: backdropImages[4],
    vote_average: 8.2,
    vote_count: 1100,
    release_date: "2019-02-14",
    overview: "A coming-of-age story based on the lives of street rappers in Mumbai.",
    genre_ids: [18, 10402]
  }
];

// Local movie details for when a specific movie is selected
const getLocalMovieDetails = (id: number): MovieDetail | null => {
  const movie = localMovies.find(m => m.id === id);
  if (!movie) return null;
  
  return {
    ...movie,
    genres: [
      { id: 18, name: "Drama" },
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 878, name: "Science Fiction" },
      { id: 10749, name: "Romance" },
      { id: 35, name: "Comedy" }
    ].filter(g => movie.genre_ids.includes(g.id)),
    runtime: 120 + (id % 60), // Random runtime between 120-180 minutes
    status: "Released",
    tagline: "An amazing cinematic experience",
    revenue: 100000000 + (id * 50000000),
    budget: 50000000 + (id * 10000000)
  };
};

// Local movie reviews for when a specific movie is selected
const getLocalMovieReviews = (id: number): MovieReview[] => {
  return [
    {
      id: `review-${id}-1`,
      author: "John Doe",
      content: "This movie was absolutely amazing! The performances were stellar and the direction was impeccable. I would highly recommend it to anyone who appreciates good cinema.",
      created_at: "2023-05-15T10:23:45.000Z",
      author_details: {
        rating: 9,
        avatar_path: null,
        username: "johndoe"
      }
    },
    {
      id: `review-${id}-2`,
      author: "Jane Smith",
      content: "While I enjoyed most aspects of this film, I felt the pacing was a bit off in the middle section. The acting was great though and the cinematography was breathtaking.",
      created_at: "2023-06-22T14:12:33.000Z",
      author_details: {
        rating: 7,
        avatar_path: null,
        username: "janesmith"
      }
    },
    {
      id: `review-${id}-3`,
      author: "Robert Johnson",
      content: "One of the best films I've seen this year! The plot twists kept me on the edge of my seat, and the character development was superb. This one will definitely stand the test of time.",
      created_at: "2023-07-08T09:45:12.000Z",
      author_details: {
        rating: 10,
        avatar_path: null,
        username: "robertj"
      }
    }
  ];
};

// Get trending movies (returning local data)
export const getTrendingMovies = async (page = 1): Promise<MovieResponse | null> => {
  try {
    // Return a subset of movies for pagination
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedMovies = localMovies.slice(startIndex, endIndex);
    
    return {
      results: paginatedMovies,
      total_pages: Math.ceil(localMovies.length / pageSize),
      total_results: localMovies.length,
      page: page
    };
  } catch (error) {
    return handleApiError(error, "Couldn't load trending movies");
  }
};

// Search movies by query (using local data)
export const searchMovies = async (query: string, page = 1): Promise<MovieResponse | null> => {
  if (!query.trim()) return null;
  
  try {
    const lowercaseQuery = query.toLowerCase();
    const filteredMovies = localMovies.filter(movie => 
      movie.title.toLowerCase().includes(lowercaseQuery)
    );
    
    // Basic pagination
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = filteredMovies.slice(startIndex, endIndex);
    
    return {
      results: paginatedResults,
      total_pages: Math.ceil(filteredMovies.length / pageSize),
      total_results: filteredMovies.length,
      page: page
    };
  } catch (error) {
    return handleApiError(error, "Couldn't search for movies");
  }
};

// Get movie details by ID (using local data)
export const getMovieDetails = async (id: number): Promise<MovieDetail | null> => {
  try {
    return getLocalMovieDetails(id);
  } catch (error) {
    return handleApiError(error, "Couldn't load movie details");
  }
};

// Get movie reviews (using local data)
export const getMovieReviews = async (id: number, page = 1): Promise<MovieReviewsResponse | null> => {
  try {
    const reviews = getLocalMovieReviews(id);
    
    return {
      results: reviews,
      total_pages: 1,
      total_results: reviews.length,
      page: page
    };
  } catch (error) {
    return handleApiError(error, "Couldn't load movie reviews");
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
