import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  return (
    <div className="flex items-center p-4 border-b">
      <div className="relative flex-grow mr-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input placeholder="Search Idea" className="pl-10" />
      </div>
      <Button variant="outline">Filter</Button>
    </div>
  );
}
