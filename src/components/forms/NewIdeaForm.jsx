// src/components/forms.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AssigneeDropdown from "@/components/common/AssigneeDropdown";
import TagsDropdown from "@/components/common/TagsDropdown";

const NewIdeaForm = ({ newIdea, setNewIdea, teamMembers }) => {
  teamMembers = [
    ...teamMembers,
  ];

  return (
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
          onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
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

      <AssigneeDropdown newIdea={newIdea} setNewIdea={setNewIdea} teamMembers={teamMembers}/>

      <TagsDropdown newIdea={newIdea} setNewIdea={setNewIdea} />
    </div>
  );
};

export default NewIdeaForm;
