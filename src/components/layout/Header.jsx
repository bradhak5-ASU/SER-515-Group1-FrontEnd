import React from "react";
import { ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header({ onCreateIdeaClick }) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2 cursor-pointer">
        <h1 className="text-xl font-semibold">Project Board</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={() => onCreateIdeaClick("Proposed")}>
          + Create Idea
        </Button>
        <Button variant="outline" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
