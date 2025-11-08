import React, { useState, useEffect } from "react";
import axios from "axios";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/layout/Header";
import { TaskColumn } from "@/components/Task/TaskColumn";

import NewIdeaForm from "@/components/forms/NewIdeaForm";

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
  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    assignee: "",
    tags: [],
  });

  const handleOpenCreateModal = (columnTitle) => {
    setNewIdea({ title: "", description: "", assignee: "", tags: [] });
    setSelectedColumn(columnTitle);
    setIsModalOpen(true);
  };

  const handleSaveIdea = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stories`,
        {
          title: newIdea.title,
          description: newIdea.description,
          assignee: newIdea.assignee,
          tags: newIdea.tags || [],
          status: selectedColumn || "Proposed",
        }
      );

      setColumnData((prevColumns) => {
        return prevColumns.map((col) =>
          col.title === selectedColumn
            ? { ...col, tasks: [...col.tasks, data?.story] }
            : col
        );
      });

      setIsModalOpen(false);
      setNewIdea({
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
        alert("Failed to save idea. Please try again.");
      }
    }
  };

  const fetchIdeas = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/stories");

      const newBoard = JSON.parse(JSON.stringify(initialColumns));

      data.forEach((idea) => {
        const column = newBoard.find((col) => col.title === idea.status);
        if (column) {
          column.tasks.push(idea);
        }
      });

      setColumnData(newBoard);
    } catch (err) {
      console.error("Failed to load ideas. Please try again later.", err);
      alert("Failed to load ideas. Please try again later.");
    }
  };

  const IdeaFormFooter = () => (
    <>
      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
        Cancel
      </Button>
      <Button
        onClick={() => {
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
  );

  const isFormValid =
    newIdea.title.trim() !== "" &&
    newIdea.description.trim() !== "" &&
    newIdea.assignee.trim() !== "";

  useEffect(() => {
    fetchIdeas();
    setTeamMembers(dummyTeamMembers);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header onCreateIdeaClick={handleOpenCreateModal} />
      <SearchBar />
      <section className="flex flex-grow p-4 space-x-4 overflow-scroll">
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

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Idea"
          description="Fill in the details for your new idea. Click save when you're done."
          footer={<IdeaFormFooter />}
        >
          <NewIdeaForm
            newIdea={newIdea}
            setNewIdea={setNewIdea}
            teamMembers={teamMembers}
          />
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
