import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Header({ onCreateIdeaClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
      <div className="flex items-center gap-2 cursor-pointer">
        <h1 className="text-xl font-semibold">Project Board</h1>
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={onCreateIdeaClick}>+ Create Idea</Button>
        {user && (
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">{user.email}</span>
          </div>
        )}
        <Button variant="outline" size="icon" title="Settings">
          <Settings className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
