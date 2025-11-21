import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

import { Modal } from "@/components/common/Modal";
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
  const [originalColumnData, setOriginalColumnData] = useState(initialColumns);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasInitialLoad = useRef(false);
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

      const updatedColumns = originalColumnData.map((col) =>
        col.title === selectedColumn
          ? { ...col, tasks: [...col.tasks, data?.story] }
          : col
      );
      setOriginalColumnData(updatedColumns);
      setColumnData(updatedColumns);

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

  const fetchIdeas = useCallback(async (searchTerm = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000";
      let url;
      
      // If search term is provided, use /filter endpoint
      if (searchTerm && searchTerm.trim() !== "") {
        const trimmedTerm = searchTerm.trim();
        // Check if search term is a pure integer
        const isInteger = /^\d+$/.test(trimmedTerm);
        // If it's an integer, send as number, otherwise as string
        const searchValue = isInteger ? parseInt(trimmedTerm, 10) : trimmedTerm;
        url = `${baseUrl}/filter?search=${encodeURIComponent(searchValue)}`;
      } else {
        // If no search term, use regular /stories endpoint
        url = `${baseUrl}/stories`;
      }

      const { data } = await axios.get(url);

      const newBoard = JSON.parse(JSON.stringify(initialColumns));

      // Filter by title if search term exists and backend doesn't filter
      const filteredData = searchTerm && searchTerm.trim() !== ""
        ? data.filter((idea) =>
            idea.title?.toLowerCase().includes(searchTerm.toLowerCase().trim())
          )
        : data;

      filteredData.forEach((idea) => {
        const column = newBoard.find((col) => col.title === idea.status);
        if (column) {
          column.tasks.push(idea);
        }
      });

      if (!searchTerm || searchTerm.trim() === "") {
        setOriginalColumnData(newBoard);
      }
      setColumnData(newBoard);
    } catch (err) {
      console.error("Failed to load ideas. Please try again later.", err);
      setError(err.response?.data?.detail || err.message || "Failed to load ideas. Please try again later.");
      // If search fails, fall back to original data
      if (searchTerm && searchTerm.trim() !== "") {
        setColumnData(originalColumnData);
      } else {
        // If initial load fails, show empty columns
        setColumnData(initialColumns);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFilter = useCallback((searchTerm) => {
    fetchIdeas(searchTerm);
  }, [fetchIdeas]);

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
    // Only fetch on initial load once
    if (!hasInitialLoad.current) {
      hasInitialLoad.current = true;
      fetchIdeas();
      setTeamMembers(dummyTeamMembers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // fetchIdeas is stable, doesn't need to be in deps

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header onCreateIdeaClick={handleOpenCreateModal} />
      <SearchBar onFilter={handleFilter} />
      {isLoading ? (
        <div className="flex flex-grow items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : error ? (
        <div className="flex flex-grow items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-2">{error}</p>
            <button
              onClick={() => fetchIdeas()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
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
      )}

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
