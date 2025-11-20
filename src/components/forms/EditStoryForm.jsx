import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import TagsDropdown from "@/components/common/TagsDropdown";

const EditStoryForm = ({ story, onSave, teamMembers }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    acceptanceCriteria: [],
    storyPoints: "",
    assignee: "",
    tags: [],
  });

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title || "",
        description: story.description || "",
        acceptanceCriteria: story.acceptanceCriteria || [],
        storyPoints: story.storyPoints || "",
        assignee: story.assignee || "",
        tags: story.tags || [],
      });
    }
  }, [story]);

  const updateCriteria = (index, value) => {
    const updated = [...formData.acceptanceCriteria];
    updated[index] = value;
    setFormData({ ...formData, acceptanceCriteria: updated });
  };

  const addCriterion = () => {
    setFormData({
      ...formData,
      acceptanceCriteria: [...formData.acceptanceCriteria, ""],
    });
  };

  const removeCriterion = (index) => {
    const updated = formData.acceptanceCriteria.filter((_, i) => i !== index);
    setFormData({ ...formData, acceptanceCriteria: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...story,
      ...formData,
      acceptanceCriteria: formData.acceptanceCriteria.filter((c) => c.trim()),
      storyPoints: formData.storyPoints ? parseInt(formData.storyPoints) : null,
    });
  };

  const teamMembersWithDefault = [
    { name: "Select an assignee", id: 0, role: "" },
    ...teamMembers,
  ];

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {/* Title */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="edit-title" className="text-right">
          Title
        </Label>
        <Input
          id="edit-title"
          placeholder="Enter the title"
          className="col-span-3"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      {/* Description */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="edit-description" className="text-right">
          Description
        </Label>
        <Input
          id="edit-description"
          placeholder="Describe the story"
          className="col-span-3"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      {/* Acceptance Criteria */}
      <div className="grid grid-cols-4 items-start gap-4">
        <Label className="text-right pt-2">Acceptance Criteria</Label>
        <div className="col-span-3 space-y-2">
          {formData.acceptanceCriteria.map((criteria, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Criterion ${index + 1}`}
                value={criteria}
                onChange={(e) => updateCriteria(index, e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeCriterion(index)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCriterion}
            className="w-full"
          >
            + Add Criterion
          </Button>
        </div>
      </div>

      {/* Story Points */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="edit-story-points" className="text-right">
          Story Points
        </Label>
        <Input
          id="edit-story-points"
          type="number"
          min="0"
          max="100"
          placeholder="e.g., 8"
          className="col-span-3"
          value={formData.storyPoints}
          onChange={(e) =>
            setFormData({ ...formData, storyPoints: e.target.value })
          }
        />
      </div>

      {/* Assignee */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="edit-assignee" className="text-right">
          Assignee
        </Label>
        <select
          id="edit-assignee"
          className="col-span-3 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={formData.assignee}
          onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
        >
          {teamMembersWithDefault.map((member, index) => (
            <option key={`${member.id}-${index}`} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <TagsDropdown
        newIdea={formData}
        setNewIdea={setFormData}
      />

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default EditStoryForm;