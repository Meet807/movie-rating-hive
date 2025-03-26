
import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative w-full max-w-2xl mx-auto group animate-fade-in"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full h-12 px-4 pl-12 bg-white/80 backdrop-blur-md border border-border rounded-full 
                     shadow-sm focus:ring-1 focus:ring-primary/20 focus:border-primary 
                     transition-all duration-300 ease-in-out"
          aria-label="Search movies"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground">
          <Search size={18} className="transition-opacity" />
        </div>
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 px-4 bg-primary text-primary-foreground 
                    rounded-full opacity-90 hover:opacity-100 transition-opacity"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
