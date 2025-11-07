import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/SearchBar";
import { TaskColumn } from "@/components/Task/TaskColumn";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NewIdeaForm from "@/components/forms/NewIdeaForm";
import NewTaskForm from "@/components/forms/NewTaskForm";

const initialColumns = [
  {
    title: "Proposed",
    dotColor: "bg-gray-400",
    tasks: [
      {
        id: "1",
        title: "Implement User Authentication",
        description: "Develop and integrate user login, registration, and session management.",
        assigne: "Balaji",
        status: "Proposed",
        tags: ["Backend", "Security"],
      },
      {
        id: "2",
        title: "Design Database Schema",
        description: "Create the database schema for users, tasks, and projects.",
        assigne: "Rahul",
        status: "Proposed",
        tags: ["Backend", "Database"],
      },
      {
        id: "3",
        title: "Set up Project Structure",
        description: "Initialize the frontend and backend repositories with basic folder structures.",
        assigne: "Charith",
        status: "Proposed",
        tags: ["Frontend", "Backend"],
      },
      {
        id: "12",
        title: "Configure CI/CD Pipeline",
        description: "Set up continuous integration and deployment workflows using GitHub Actions.",
        assigne: "Akshat",
        status: "Proposed",
        tags: ["DevOps", "CI/CD"],
      },
      {
        id: "13",
        title: "Create API Endpoints",
        description: "Develop RESTful API endpoints for user management and task operations.",
        assigne: "Balaji",
        status: "Proposed",
        tags: ["Backend", "API"],
      },
      {
        id: "14",
        title: "Implement State Management",
        description: "Set up Redux or Context API for global state management in the frontend.",
        assigne: "Charith",
        status: "Proposed",
        tags: ["Frontend", "State"],
      },
      {
        id: "15",
        title: "Add Unit Tests",
        description: "Write comprehensive unit tests for critical components and functions.",
        assigne: "Rahul",
        status: "Proposed",
        tags: ["Testing", "Quality"],
      },
      {
        id: "16",
        title: "Design User Interface",
        description: "Create wireframes and mockups for the main dashboard and task management views.",
        assigne: "Vishesh",
        status: "Proposed",
        tags: ["UI/UX", "Design"],
      },
      {
        id: "17",
        title: "Set up Authentication Middleware",
        description: "Implement JWT-based authentication middleware for protected routes.",
        assigne: "Akshat",
        status: "Proposed",
        tags: ["Backend", "Security"],
      },
      {
        id: "18",
        title: "Create Task Filtering System",
        description: "Implement filtering and sorting functionality for tasks by status, assignee, and tags.",
        assigne: "Balaji",
        status: "Proposed",
        tags: ["Frontend", "Features"],
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
        description: "Create comprehensive API documentation for all endpoints.",
        assigne: "Akshat",
        status: "Needs Refinement",
        tags: ["Backend", "Research"],
      },
      {
        id: "5",
        title: "UI Component Library",
        description: "Build reusable UI components for the dashboard.",
        assigne: "Balaji",
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
        assigne: "Rahul",
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
        description: "Set up automated code review process with GitHub Actions.",
        assigne: "Charith",
        status: "Ready To Commit",
        tags: ["DevOps", "Testing"],
      },
      {
        id: "8",
        title: "Error Handling",
        description: "Implement comprehensive error handling across the application.",
        assigne: "Akshat",
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
        assigne: "Balaji",
        status: "Sprint Ready",
        tags: ["Frontend", "Research"],
      },
      {
        id: "10",
        title: "Database Connection",
        description: "Established connection between backend and PostgreSQL database.",
        assigne: "Rahul",
        status: "Sprint Ready",
        tags: ["Backend", "Database"],
      },
      {
        id: "11",
        title: "Frontend Routing",
        description: "Implemented React Router for navigation between pages.",
        assigne: "Charith",
        status: "Sprint Ready",
        tags: ["Frontend", "Refactor"],
      },
    ],
  },
];

const DashboardPage = () => {
const [newIdea, setNewIdea] = useState({
title: "",
description: "",
assignee: "",
tags: [],
});  
const [isModalOpen, setIsModalOpen] = useState(false);
const [newTask, setNewTask] = useState({
  title: "",
  description: "",
  assignee: "",
  tags: "",
});
const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
const [selectedColumn, setSelectedColumn] = useState("");
  const [columnData, setColumnData] = useState(initialColumns);

 const handleOpenCreateModal = () => {
  setNewIdea({ title: "", description: "", assignee: "", tags: [] });
  setIsModalOpen(true);
};

const handleOpenCreateTaskModal = (columnTitle) => {
  setNewTask({ title: "", description: "", assignee: "", tags: "" });
  setSelectedColumn(columnTitle);
  setIsTaskModalOpen(true);
};

const handleSaveTask = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/stories",
      {
        title: newTask.title,
        description: newTask.description,
        assigne: newTask.assignee,
        status: selectedColumn,
        tags: newTask.tags || "",
      }
    );

    const savedTask = response.data;

    // Update the UI on success - add task to the selected column
    setColumnData((prevColumns) => {
      return prevColumns.map((col) =>
        col.title === selectedColumn
          ? { ...col, tasks: [...col.tasks, savedTask] }
          : col
      );
    });

    setIsTaskModalOpen(false);
    setNewTask({ title: "", description: "", assignee: "", tags: "" });
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

  const handleSaveIdea = async () => {
    try {
      // Axios automatically stringifies the object and sets the correct headers
      const response = await axios.post(
        "http://127.0.0.1:8000/stories",
        {
        title: newIdea.title,
        description: newIdea.description,
        assigne: "Balaji",
        status: "Proposed",
      }
      );

      // Axios puts the response data directly in the `data` property
      const savedIdea = response.data;

      // Update the UI on success (same as before)
      setColumnData((prevColumns) => {
        const newColumns = [...prevColumns];
        const proposedColumn = newColumns.find(
          (col) => col.title === "Proposed"
        );
        if (proposedColumn) {
          proposedColumn.tasks.push(savedIdea);
        }
        return newColumns;
      });

      setIsModalOpen(false);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const fetchIdeas = async () => {
    try {
      // Replace with your actual backend endpoint
      const response = await axios.get("http://127.0.0.1:8000/stories");

      const ideas = response.data;
      console.log("idea",ideas);

      // Create a fresh board state
      const newBoard = JSON.parse(JSON.stringify(initialColumns));

      // Distribute the fetched ideas into the correct columns
      ideas.forEach((idea) => {
        const column = newBoard.find((col) => col.title === idea.status);
        if (column) {
          column.tasks.push(idea);
        }
      });

      setColumnData(newBoard);
    } catch (err) {
      console.error("Failed to load ideas. Please try again later.", err);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

const isFormValid =
  newIdea.title.trim() !== "" &&
  newIdea.description.trim() !== "" &&
  newIdea.assignee.trim() !== "";

const isTaskFormValid =
  newTask.title.trim() !== "" &&
  newTask.description.trim() !== "" &&
  newTask.assignee.trim() !== "";

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Main Dashboard Container */}
      <div className="flex flex-col h-full bg-white">
        {/* Header - Fixed at top */}
        <Header onCreateIdeaClick={handleOpenCreateModal} />
        
        {/* Search Bar - Fixed below header */}
        <SearchBar />
        
        {/* Main Content Area - Scrollable columns */}
        <main className="flex-1 overflow-x-auto overflow-y-hidden p-4 bg-gray-50">
          <div className="flex gap-4 items-stretch h-full" style={{ width: 'max-content' }}>
            {columnData.map((column) => (
              <TaskColumn
                key={column.title}
                title={column.title}
                dotColor={column.dotColor}
                tasks={column.tasks}
                onAddTask={handleOpenCreateTaskModal}
              />
            ))}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Idea"
          description="Fill in the details for your new idea. Click save when you're done."
          footer={
            <>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
                <Button onClick={() => { 
                  console.log("[UI] Save clicked", {
                    title: newIdea.title,
                    description: newIdea.description,
                    assignee: newIdea.assignee,
                    tags: newIdea.tags,
                    isFormValid,
                  });
                  handleSaveIdea();
                }}
                disabled={!isFormValid}
                >
                  Save Idea
                  </Button>

            </>
          }
        >
              <NewIdeaForm newIdea={newIdea} setNewIdea={setNewIdea} />

        </Modal>
      )}

      {isTaskModalOpen && (
        <Modal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          title="Create New Task"
          description="Fill in the details for your new task. Click save when you're done."
          footer={
            <>
              <Button variant="outline" onClick={() => setIsTaskModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveTask}
                disabled={!isTaskFormValid}
              >
                Save Task
              </Button>
            </>
          }
        >
          <NewTaskForm newTask={newTask} setNewTask={setNewTask} />
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
