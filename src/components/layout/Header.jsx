import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

export function Header({ onCreateIdeaClick }) {
  const navigate = useNavigate();

  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
        </Button>
      </div>
    </header>
  );
}
