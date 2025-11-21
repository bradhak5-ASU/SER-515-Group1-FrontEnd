import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/Task/TaskCard";

export function TaskColumn({ title, dotColor, tasks = [], onAddTask }) {
  return (
    <div className="flex-1 min-w-20 border border-gray-100 rounded-lg p-4 bg-gray-50 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 flex-none">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
          <h2 className="font-semibold text-foreground">{title}</h2>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAddTask && onAddTask(title)}
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 flex-1 min-h-0 overflow-y-auto pr-1">
        {tasks.map((task, index) => (
          <TaskCard key={`${task.id}-${index}`} task={task} />
        ))}
      </div>
    </div>
  );
}
