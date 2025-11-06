import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, UserPlus, Trash2, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TaskCard({ task, onEdit, onAssign, onDelete, onMoveToTop }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleEdit = () => {
    setIsMenuOpen(false);
    if (onEdit) {
      onEdit(task);
    } else {
      console.log("Edit card:", task);
    }
  };

  const handleAssign = () => {
    setIsMenuOpen(false);
    if (onAssign) {
      onAssign(task);
    } else {
      console.log("Assign To:", task);
    }
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    if (onDelete) {
      onDelete(task);
    } else {
      console.log("Delete card:", task);
    }
  };

  const handleMoveToTop = () => {
    setIsMenuOpen(false);
    if (onMoveToTop) {
      onMoveToTop(task);
    } else {
      console.log("Move to top:", task);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-2 relative">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-xs font-semibold text-primary">{task?.title || "Task"}</div>
          <p className="text-sm text-muted-foreground mt-1">{task?.description || ""}</p>
        </div>
        <div className="relative" ref={menuRef}>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          {isMenuOpen && (
            <div className="absolute right-0 top-8 z-50 w-48 rounded-md border bg-white shadow-lg py-1">
              <button
                onClick={handleEdit}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-teal-600 hover:bg-gray-50"
              >
                <Pencil className="h-4 w-4 text-teal-600" />
                <span className="text-teal-600">Edit card</span>
              </button>
              <button
                onClick={handleAssign}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-teal-600 hover:bg-gray-50"
              >
                <UserPlus className="h-4 w-4 text-teal-600" />
                <span className="text-teal-600">Assign To</span>
              </button>
              <button
                onClick={handleDelete}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-teal-600 hover:bg-gray-50"
              >
                <Trash2 className="h-4 w-4 text-teal-600" />
                <span className="text-teal-600">Delete card</span>
              </button>
              <button
                onClick={handleMoveToTop}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-teal-600 hover:bg-gray-50"
              >
                <ArrowUp className="h-4 w-4 text-teal-600" />
                <span className="text-teal-600">Move to top</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
