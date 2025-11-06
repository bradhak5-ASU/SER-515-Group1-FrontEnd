// src/components/forms.jsx
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TagsDropdown = ({ newIdea, setNewIdea }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const options = ["Frontend", "Backend", "Research", "Refactor", "Bug", "Testing"];
  const selected = Array.isArray(newIdea.tags) ? newIdea.tags : [];
  const hasSelection = selected.length > 0;

  const toggleTag = (tag) => {
    const next = selected.includes(tag)
      ? selected.filter((t) => t !== tag)
      : [...selected, tag];
    setNewIdea({ ...newIdea, tags: next });
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <Label htmlFor="tags" className="text-right pt-2">
        Tags
      </Label>

      <div className="col-span-3 relative" ref={ref}>
        <button
          type="button"
          id="tags"
          onClick={() => setIsOpen((o) => !o)}
          className={`h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-left text-sm
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                      ${hasSelection ? "text-foreground" : "text-muted-foreground"}`}
        >
          {hasSelection ? selected.join(", ") : "Select one or more tags"}
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover p-2 shadow-md">
            <div className="max-h-56 overflow-auto pr-1">
              {options.map((tag) => {
                const checked = selected.includes(tag);
                return (
                  <label
                    key={tag}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-accent"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={checked}
                      onChange={() => toggleTag(tag)}
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                );
              })}
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setNewIdea({ ...newIdea, tags: [] })}
                className="text-xs text-muted-foreground hover:underline"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-primary hover:underline"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NewIdeaForm = ({ newIdea, setNewIdea }) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="idea-title" className="text-right">
          Title
        </Label>
        <Input
          id="idea-title"
          placeholder="Enter the title"
          className="col-span-3"
          value={newIdea.title}
          onChange={(e) =>
            setNewIdea({ ...newIdea, title: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          placeholder="Describe the new idea"
          className="col-span-3"
          value={newIdea.description}
          onChange={(e) =>
            setNewIdea({ ...newIdea, description: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="assignee" className="text-right">
          Assignee
        </Label>
        <select
          id="assignee"
          className={`col-span-3 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                      ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${newIdea.assignee ? "text-foreground" : "text-muted-foreground"}`}
          value={newIdea.assignee ?? ""}
          onChange={(e) => setNewIdea({ ...newIdea, assignee: e.target.value })}
        >
          <option value="" disabled>Select an assignee</option>
          <option value="Akshat">Akshat</option>
          <option value="Balaji">Balaji</option>
          <option value="Charith">Charith</option>
          <option value="Rahul">Rahul</option>
          <option value="Vishesh">Vishesh</option>
        </select>
      </div>

      <TagsDropdown newIdea={newIdea} setNewIdea={setNewIdea} />
    </div>
  );
};

export default NewIdeaForm;
