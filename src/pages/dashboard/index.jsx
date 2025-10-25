import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/SearchBar";
import { TaskColumn } from "@/components/Task/TaskColumn";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialColumns = [
  {
    title: "Proposed",
    dotColor: "bg-gray-400",
    tasks: [
      {
        title: "Sample Task",
        description: "This is a sample task description.",
      },
    ],
  },
  { title: "Needs Refinement", dotColor: "bg-blue-500", tasks: [] },
  { title: "In Refinement", dotColor: "bg-yellow-500", tasks: [] },
  { title: "Ready To Commit", dotColor: "bg-purple-500", tasks: [] },
  { title: "Sprint Ready", dotColor: "bg-green-500", tasks: [] },
];

const DashboardPage = () => {
  const [newIdea, setNewIdea] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnData, setColumnData] = useState(initialColumns);

  const handleOpenCreateModal = () => {
    setNewIdea({ title: "", description: "" });
    setIsModalOpen(true);
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

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header onCreateIdeaClick={handleOpenCreateModal} />
      <SearchBar />
      <section className="flex flex-grow p-4 space-x-4 overflow-scroll">
        {columnData.map((column) => (
          <TaskColumn
            key={column.title}
            title={column.title}
            dotColor={column.dotColor}
            tasks={column.tasks}
          />
        ))}
      </section>

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
              <Button onClick={handleSaveIdea}>Save Idea</Button>
            </>
          }
        >
          {/* This is the content inside the modal */}
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="idea-title" className="text-right">
                Title
              </Label>
              <Input
                id="idea-title"
                placeholder="Enter the title"
                className="col-span-3"
                value={newIdea.title}
                onChange={(e) =>
                  setNewIdea({ ...newIdea, title: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Describe the new idea"
                className="col-span-3"
                value={newIdea.description}
                onChange={(e) =>
                  setNewIdea({ ...newIdea, description: e.target.value })
                }
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;
