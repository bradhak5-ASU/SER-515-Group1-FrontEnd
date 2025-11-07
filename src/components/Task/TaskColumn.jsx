import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/Task/TaskCard";

export function TaskColumn({ title, dotColor, tasks = [], onAddTask }) {  
  return (
    // Increased width to w-96 for wider cards and slightly darker column border for separation
    <div className="flex flex-col h-full w-96 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
      {/* Column Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
          <h2 className="font-semibold text-foreground">{title}</h2>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => onAddTask && onAddTask(title)}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Column Body - Scrollable */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-3 custom-scrollbar"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        {tasks.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            No tasks yet. Click + to add one.
          </div>
        ) : (
          tasks.map((task, index) => (
            <TaskCard key={task.id || index} task={task} />
          ))
        )}
      </div>
    </div>
  );
}
