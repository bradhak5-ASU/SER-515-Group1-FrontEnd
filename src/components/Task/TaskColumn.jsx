import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/Task/TaskCard";

export function TaskColumn({ title, dotColor, tasks = [], onAddTask }) {
  return (
    <div className="flex flex-col flex-1 min-w-72 border border-gray-100 rounded-lg bg-gray-50 h-full max-h-full overflow-hidden">
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
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

      {/* Scrollable Column Body */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center text-gray-400 text-sm py-8">
              No tasks yet
            </div>
          ) : (
            tasks.map((task, index) => (
              <TaskCard key={`${task.id}-${index}`} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
