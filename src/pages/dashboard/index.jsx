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

const handleSaveIdea = async () => {
  const payload = {
    title: newIdea.title,
    description: newIdea.description,
    assigne: newIdea.assignee || "Balaji",
    status: "Proposed",
    tags: newIdea.tags,
  };

  console.log("[SAVE] Entered handleSaveIdea");
  console.log("[SAVE] Payload to send:", payload);

  try {
    console.log("[SAVE] About to POST to http://127.0.0.1:8000/stories");
    const response = await axios.post("http://127.0.0.1:8000/stories", payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });

    console.log("[SAVE] POST response:", response.status, response.data);

    const savedIdea = response.data;

    setColumnData((prev) =>
      prev.map((col) =>
        col.title === "Proposed"
          ? { ...col, tasks: [...col.tasks, savedIdea] }
          : col
      )
    );

    setIsModalOpen(false);
  } catch (err) {
    // Log everything possible
    console.error("[SAVE][ERROR] err:", err);
    console.error("[SAVE][ERROR] err.message:", err?.message);
    console.error("[SAVE][ERROR] err.response:", err?.response);
    console.error("[SAVE][ERROR] err.request:", err?.request);

    alert(
      err?.response?.data?.message ||
        err?.message ||
        "Failed to save idea. See console for details."
    );
  }
};




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
const [newIdea, setNewIdea] = useState({
title: "",
description: "",
assignee: "",
tags: [],
});  
const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnData, setColumnData] = useState(initialColumns);

 const handleOpenCreateModal = () => {
  setNewIdea({ title: "", description: "", assignee: "", tags: [] });
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

const isFormValid =
  newIdea.title.trim() !== "" &&
  newIdea.description.trim() !== "" &&
  newIdea.assignee.trim() !== "";

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
    </div>
  );
};

export default DashboardPage;
