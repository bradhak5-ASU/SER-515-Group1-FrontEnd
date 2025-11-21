import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";

export function SearchBar({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const isInitialMount = useRef(true);

  // Use ref to store the debounced function so it doesn't get recreated
  const debouncedFilterRef = useRef(
    debounce((term) => {
      onFilter(term);
    }, 500)
  );

  // Update the debounced function if onFilter changes
  useEffect(() => {
    debouncedFilterRef.current = debounce((term) => {
      onFilter(term);
    }, 500);
  }, [onFilter]);

  // Call debounced filter whenever searchTerm changes (but not on initial mount)
  useEffect(() => {
    // Skip the initial mount - only call when user actually types
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Only call if searchTerm is not empty (don't call API with empty string)
    if (searchTerm && searchTerm.trim() !== "") {
      debouncedFilterRef.current(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="flex items-center p-4 border-b">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search Idea"
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
