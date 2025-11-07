import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NewTaskForm = ({ newTask, setNewTask }) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="task-title" className="text-right">
          Title
        </Label>
        <Input
          id="task-title"
          placeholder="Enter the title"
          className="col-span-3"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="task-description" className="text-right">
          Description
        </Label>
        <Input
          id="task-description"
          placeholder="Describe the task"
          className="col-span-3"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="task-assignee" className="text-right">
          Assignee
        </Label>
        <select
          id="task-assignee"
          className={`col-span-3 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                      ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${newTask.assignee ? "text-foreground" : "text-muted-foreground"}`}
          value={newTask.assignee ?? ""}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
        >
          <option value="" disabled>Select an assignee</option>
          <option value="Akshat">Akshat</option>
          <option value="Balaji">Balaji</option>
          <option value="Charith">Charith</option>
          <option value="Rahul">Rahul</option>
          <option value="Vishesh">Vishesh</option>
        </select>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="task-tags" className="text-right">
          Tags
        </Label>
        <Input
          id="task-tags"
          placeholder="Enter tags"
          className="col-span-3"
          value={newTask.tags}
          onChange={(e) =>
            setNewTask({ ...newTask, tags: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default NewTaskForm;

