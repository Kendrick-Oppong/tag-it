// components/GlobalSearch.tsx
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GlobalSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) setSearchQuery(""); // Clear input when collapsing
  };

  return (
    <div className="flex items-center justify-center w-full md:w-auto">
      {/* Desktop Search Bar */}
      <div className="hidden md:flex relative w-full max-w-md">
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search all bookmarks..."
          className="pl-10 pr-10 rounded-full bg-muted/20 border-muted focus:border-primary text-foreground placeholder-muted-foreground"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchQuery("")}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
          >
            <X size={20} />
          </Button>
        )}
      </div>

      {/* Mobile Search Icon/Button */}
      <div className="md:hidden flex items-center">
        {isExpanded ? (
          <div className="relative w-full">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all bookmarks..."
              className="w-full pl-10 pr-10 rounded-full bg-muted/20 border-muted focus:border-primary text-foreground placeholder-muted-foreground"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
            >
              <X size={20} />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="p-2 rounded-full hover:bg-muted/20"
          >
            <Search size={20} className="text-foreground" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
