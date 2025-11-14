import { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";

const TagsDropdown = ({ newTask, setNewTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const options = [
    "Frontend",
    "Backend",
    "Research",
    "Refactor",
    "Bug",
    "Testing",
  ];
  const selected = Array.isArray(newTask.tags) ? newTask.tags : [];
  const hasSelection = selected.length > 0;

  const toggleTag = (tag) => {
    const next = selected.includes(tag)
      ? selected.filter((t) => t !== tag)
      : [...selected, tag];
    setNewTask({ ...newTask, tags: next });
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
                      ${
                        hasSelection
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
        >
          {hasSelection ? selected.join(", ") : "Select one or more tags"}
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover p-2 shadow-md">
            <div className="max-h-56 overflow-auto pr-1">
              {options.map((tag, index) => {
                const checked = selected.includes(tag);
                return (
                  <label
                    key={`${tag}-${index}`}
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
                onClick={() => setNewTask({ ...newTask, tags: [] })}
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

export default TagsDropdown;
