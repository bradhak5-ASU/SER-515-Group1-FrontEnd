// src/components/forms.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import TagsDropdown from "@/components/common/TagsDropdown";

const NewTaskForm = ({ newTask, setNewTask, teamMembers }) => {
  teamMembers = [
    { name: "Select an assignee", id: 0, role: "" },
    ...teamMembers,
  ];

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
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          placeholder="Describe the new task"
          className="col-span-3"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
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
                      ${
                        newTask.assignee
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
          value={newTask.assignee ?? ""}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
        >
          {teamMembers.map((member, index) => (
            <option key={`${member.id}-${index}`} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      <TagsDropdown newTask={newTask} setNewTask={setNewTask} />
    </div>
  );
};

export default NewTaskForm;

