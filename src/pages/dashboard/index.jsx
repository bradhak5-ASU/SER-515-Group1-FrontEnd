import React, { useState, useEffect } from "react";
import axios from "axios";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/layout/Header";
import { TaskColumn } from "@/components/Task/TaskColumn";

import NewTaskForm from "@/components/forms/NewTaskForm";

const initialColumns = [
  {
    title: "Proposed",
    dotColor: "bg-gray-400",
    tasks: [
      {
        id: "1",
        title: "Implement User Authentication",
        description:
          "Develop and integrate user login, registration, and session management.",
        assignee: "Balaji",
        status: "Proposed",
        tags: ["Backend", "Security"],
      },
      {
        id: "2",
        title: "Design Database Schema",
        description:
          "Create the database schema for users, tasks, and projects.",
        assignee: "Rahul",
        status: "Proposed",
        tags: ["Backend", "Database"],
      },
      {
        id: "3",
        title: "Set up Project Structure",
        description:
          "Initialize the frontend and backend repositories with basic folder structures.",
        assignee: "Charith",
        status: "Proposed",
        tags: ["Frontend", "Backend"],
      },
    ],
  },
  {
    title: "Needs Refinement",
    dotColor: "bg-blue-500",
    tasks: [
      {
        id: "4",
        title: "API Documentation",
        description:
          "Create comprehensive API documentation for all endpoints.",
        assignee: "Akshat",
        status: "Needs Refinement",
        tags: ["Backend", "Research"],
      },
      {
        id: "5",
        title: "UI Component Library",
        description: "Build reusable UI components for the dashboard.",
        assignee: "Balaji",
        status: "Needs Refinement",
        tags: ["Frontend", "UI/UX"],
      },
    ],
  },
  {
    title: "In Refinement",
    dotColor: "bg-yellow-500",
    tasks: [
      {
        id: "6",
        title: "Task Management Features",
        description: "Implement drag-and-drop functionality for task cards.",
        assignee: "Rahul",
        status: "In Refinement",
        tags: ["Frontend", "Testing"],
      },
    ],
  },
  {
    title: "Ready To Commit",
    dotColor: "bg-purple-500",
    tasks: [
      {
        id: "7",
        title: "Code Review System",
        description:
          "Set up automated code review process with GitHub Actions.",
        assignee: "Charith",
        status: "Ready To Commit",
        tags: ["DevOps", "Testing"],
      },
      {
        id: "8",
        title: "Error Handling",
        description:
          "Implement comprehensive error handling across the application.",
        assignee: "Akshat",
        status: "Ready To Commit",
        tags: ["Backend", "Bug"],
      },
    ],
  },
  {
    title: "Sprint Ready",
    dotColor: "bg-green-500",
    tasks: [
      {
        id: "9",
        title: "Initial UI Mockups",
        description: "Created wireframes and basic mockups for the dashboard.",
        assignee: "Balaji",
        status: "Sprint Ready",
        tags: ["Frontend", "Research"],
      },
      {
        id: "10",
        title: "Database Connection",
        description:
          "Established connection between backend and PostgreSQL database.",
        assignee: "Rahul",
        status: "Sprint Ready",
        tags: ["Backend", "Database"],
      },
      {
        id: "11",
        title: "Frontend Routing",
        description: "Implemented React Router for navigation between pages.",
        assignee: "Charith",
        status: "Sprint Ready",
        tags: ["Frontend", "Refactor"],
      },
    ],
  },
];

const dummyTeamMembers = [
  {
    id: 1,
    name: "Akshat",
    role: "Developer",
  },
  {
    id: 2,
    name: "Balaji",
    role: "Developer",
  },
  {
    id: 3,
    name: "Charith",
    role: "Developer",
  },
  {
    id: 4,
    name: "Rahul",
    role: "Developer",
  },
  {
    id: 5,
    name: "Vishesh",
    role: "Developer",
  },
];

const DashboardPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [columnData, setColumnData] = useState(initialColumns);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    tags: [],
  });

  const handleOpenCreateModal = (columnTitle) => {
    setNewTask({ title: "", description: "", assignee: "", tags: [] });
    setSelectedColumn(columnTitle);
    setIsModalOpen(true);
  };

  const handleSaveTask = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000"}/stories`;
      console.log("[Dashboard] Creating story:", {
        title: newTask.title,
        description: newTask.description,
        assignee: newTask.assignee,
        status: selectedColumn || "Proposed",
        url: apiUrl
      });
      
      const { data } = await axios.post(
        apiUrl,
        {
          title: newTask.title,
          description: newTask.description,
          assignee: newTask.assignee,
          tags: newTask.tags || [],
          status: selectedColumn || "Proposed",
        }
      );
      
      console.log("[Dashboard] Story created successfully:", data);

      // Refresh the dashboard data after successful creation
      await fetchTasks();

      setIsModalOpen(false);
      setNewTask({
        title: "",
        description: "",
        assignee: "",
        tags: [],
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        console.error(err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error("An unexpected error occurred. Please try again.");
        alert("Failed to save task. Please try again.");
      }
    }
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = `${import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000"}/stories`;
      console.log("[Dashboard] Fetching stories from:", apiUrl);
      
      const { data } = await axios.get(apiUrl);
      
      console.log("[Dashboard] API Response:", data);
      console.log("[Dashboard] Response type:", typeof data, "Is array:", Array.isArray(data));
      console.log("[Dashboard] Number of stories:", data?.length || 0);

      const newBoard = JSON.parse(JSON.stringify(initialColumns));

      // Clear existing tasks from initial columns
      newBoard.forEach((col) => {
        col.tasks = [];
      });

      // Status mapping for legacy values and variations
      const statusMapping = {
        "In Progress": "Proposed",
        "in progress": "Proposed",
        "IN PROGRESS": "Proposed",
        "Needs Refinement": "Needs Refinement",
        "needs refinement": "Needs Refinement",
        "In Refinement": "In Refinement",
        "in refinement": "In Refinement",
        "Ready To Commit": "Ready To Commit",
        "ready to commit": "Ready To Commit",
        "Sprint Ready": "Sprint Ready",
        "sprint ready": "Sprint Ready",
      };

      // Map API response to column tasks
      if (data && Array.isArray(data)) {
        console.log("[Dashboard] Processing stories...");
        data.forEach((story, index) => {
          // Handle potential camelCase response (e.g., createdOn)
          // But status, title, description, assignee should be as-is
          const storyStatus = story.status?.trim() || "";
          const mappedStatus = statusMapping[storyStatus] || storyStatus;
          
          console.log(`[Dashboard] Story ${index + 1}:`, {
            id: story.id,
            title: story.title,
            originalStatus: storyStatus,
            mappedStatus: mappedStatus,
            assignee: story.assignee,
            description: story.description,
            rawStory: story
          });
          
          // Try to find matching column by status (case-insensitive)
          const column = newBoard.find((col) => 
            col.title.toLowerCase() === mappedStatus.toLowerCase()
          );
          
          if (column) {
            console.log(`[Dashboard] Found column "${column.title}" for story "${story.title}" with status "${mappedStatus}"`);
            column.tasks.push({
              id: story.id,
              title: story.title || "",
              description: story.description || "",
              assignee: story.assignee || "Unassigned",
              status: mappedStatus,
              tags: story.tags || [],
            });
          } else {
            console.warn(`[Dashboard] No column found for status "${mappedStatus}" (original: "${storyStatus}"). Available columns:`, newBoard.map(col => col.title));
            // If status doesn't match, default to "Proposed" column
            const defaultColumn = newBoard.find((col) => col.title === "Proposed");
            if (defaultColumn) {
              console.log(`[Dashboard] Adding story to default "Proposed" column`);
              defaultColumn.tasks.push({
                id: story.id,
                title: story.title || "",
                description: story.description || "",
                assignee: story.assignee || "Unassigned",
                status: mappedStatus || "Proposed",
                tags: story.tags || [],
              });
            } else {
              console.error(`[Dashboard] Could not find "Proposed" column as fallback!`);
            }
          }
        });
      } else {
        console.warn("[Dashboard] API response is not an array or is empty:", data);
        if (data) {
          console.warn("[Dashboard] Response type:", typeof data);
          console.warn("[Dashboard] Response value:", JSON.stringify(data, null, 2));
        }
      }

      console.log("[Dashboard] Final board state:", newBoard.map(col => ({
        title: col.title,
        taskCount: col.tasks.length
      })));

      setColumnData(newBoard);
    } catch (err) {
      console.error("[Dashboard] Failed to load tasks:", err);
      console.error("[Dashboard] Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(
        err.response?.data?.message ||
          "Failed to load dashboard data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const TaskFormFooter = () => (
    <>
      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
        Cancel
      </Button>
      <Button
        onClick={() => {
          console.log("[UI] Save clicked", {
            title: newTask.title,
            description: newTask.description,
            assignee: newTask.assignee,
            tags: newTask.tags,
            isFormValid,
          });
          handleSaveTask();
        }}
        disabled={!isFormValid}
      >
        Save Task
      </Button>
    </>
  );

  const isFormValid =
    newTask.title.trim() !== "" &&
    newTask.description.trim() !== "" &&
    newTask.assignee.trim() !== "";

  useEffect(() => {
    fetchTasks();
    setTeamMembers(dummyTeamMembers);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header onCreateTaskClick={handleOpenCreateModal} />
      <SearchBar />
      {isLoading ? (
        <div className="flex flex-grow items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-grow items-center justify-center">
          <div className="flex flex-col items-center space-y-4 p-8">
            <div className="text-red-600 text-center">
              <p className="text-lg font-semibold mb-2">Error loading dashboard</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button
              onClick={fetchTasks}
              variant="outline"
            >
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <section className="flex flex-1 p-4 space-x-4 overflow-x-auto overflow-y-hidden min-h-0">
          {columnData.map((column, index) => (
            <TaskColumn
              key={`${column.title}-${index}`}
              title={column.title}
              dotColor={column.dotColor}
              tasks={column.tasks}
              onAddTask={handleOpenCreateModal}
            />
          ))}
        </section>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Task"
          description="Fill in the details for your new task. Click save when you're done."
          footer={<TaskFormFooter />}
        >
          <NewTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            teamMembers={teamMembers}
          />
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
