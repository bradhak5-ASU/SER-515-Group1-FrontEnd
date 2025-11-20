import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = () => {
    onFilter(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <div className="flex items-center p-4 border-b">
      <div className="relative flex-grow mr-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search Idea"
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <Button onClick={handleFilter}>Filter</Button>
    </div>
  );
}
