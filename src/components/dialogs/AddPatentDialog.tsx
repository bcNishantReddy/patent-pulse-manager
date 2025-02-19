
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface AddPatentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPatentDialog({ open, onOpenChange }: AddPatentDialogProps) {
  const [formData, setFormData] = useState({
    internalId: "",
    title: "",
    inventors: "",
    assignee: "",
    status: "",
    priority: "",
    description: "",
    clientId: "",
    tasks: {
      ps: {
        drafter: "",
        filler: "",
        drafterDeadline: "",
        fillerDeadline: "",
      },
      cs: {
        drafter: "",
        filler: "",
        drafterDeadline: "",
        fillerDeadline: "",
      },
      fer: {
        drafter: "",
        filler: "",
        drafterDeadline: "",
        fillerDeadline: "",
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine initial status based on PS task assignments
    const initialStatus = formData.tasks.ps.drafter && formData.tasks.ps.filler
      ? "PS Drafting"
      : "CS Drafting";
    
    const submissionData = {
      ...formData,
      status: initialStatus,
    };
    
    console.log("Form submitted:", submissionData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Patent</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="internalId">Internal ID</Label>
            <Input
              id="internalId"
              placeholder="Enter internal ID"
              value={formData.internalId}
              onChange={(e) =>
                setFormData({ ...formData, internalId: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Patent Title</Label>
            <Input
              id="title"
              placeholder="Enter patent title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inventors">Inventors</Label>
            <Input
              id="inventors"
              placeholder="Enter inventors (comma separated)"
              value={formData.inventors}
              onChange={(e) =>
                setFormData({ ...formData, inventors: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                value={formData.assignee}
                onValueChange={(value) =>
                  setFormData({ ...formData, assignee: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientId">Client</Label>
              <Select
                value={formData.clientId}
                onValueChange={(value) =>
                  setFormData({ ...formData, clientId: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Acme Corporation</SelectItem>
                  <SelectItem value="2">TechCorp Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-4" />
          
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Task Assignments</h3>
            
            {/* PS Task */}
            <div className="space-y-4">
              <h4 className="font-medium">PS Task</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Drafter</Label>
                  <Select
                    value={formData.tasks.ps.drafter}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          ps: { ...formData.tasks.ps, drafter: value },
                        },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select drafter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drafter1">Drafter 1</SelectItem>
                      <SelectItem value="drafter2">Drafter 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Drafter Deadline</Label>
                  <Input
                    type="date"
                    value={formData.tasks.ps.drafterDeadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          ps: {
                            ...formData.tasks.ps,
                            drafterDeadline: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Filler</Label>
                  <Select
                    value={formData.tasks.ps.filler}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          ps: { ...formData.tasks.ps, filler: value },
                        },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select filler" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="filler1">Filler 1</SelectItem>
                      <SelectItem value="filler2">Filler 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Filler Deadline</Label>
                  <Input
                    type="date"
                    value={formData.tasks.ps.fillerDeadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          ps: {
                            ...formData.tasks.ps,
                            fillerDeadline: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* CS Task */}
            <div className="space-y-4">
              <h4 className="font-medium">CS Task</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Drafter</Label>
                  <Select
                    value={formData.tasks.cs.drafter}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          cs: { ...formData.tasks.cs, drafter: value },
                        },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select drafter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drafter1">Drafter 1</SelectItem>
                      <SelectItem value="drafter2">Drafter 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Drafter Deadline</Label>
                  <Input
                    type="date"
                    value={formData.tasks.cs.drafterDeadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          cs: {
                            ...formData.tasks.cs,
                            drafterDeadline: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Filler</Label>
                  <Select
                    value={formData.tasks.cs.filler}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          cs: { ...formData.tasks.cs, filler: value },
                        },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select filler" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="filler1">Filler 1</SelectItem>
                      <SelectItem value="filler2">Filler 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Filler Deadline</Label>
                  <Input
                    type="date"
                    value={formData.tasks.cs.fillerDeadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          cs: {
                            ...formData.tasks.cs,
                            fillerDeadline: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* FER Task */}
            <div className="space-y-4">
              <h4 className="font-medium">FER Task</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Drafter</Label>
                  <Select
                    value={formData.tasks.fer.drafter}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          fer: { ...formData.tasks.fer, drafter: value },
                        },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select drafter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drafter1">Drafter 1</SelectItem>
                      <SelectItem value="drafter2">Drafter 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Drafter Deadline</Label>
                  <Input
                    type="date"
                    value={formData.tasks.fer.drafterDeadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          fer: {
                            ...formData.tasks.fer,
                            drafterDeadline: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Filler</Label>
                  <Select
                    value={formData.tasks.fer.filler}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          fer: { ...formData.tasks.fer, filler: value },
                        },
                      })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select filler" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="filler1">Filler 1</SelectItem>
                      <SelectItem value="filler2">Filler 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Filler Deadline</Label>
                  <Input
                    type="date"
                    value={formData.tasks.fer.fillerDeadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tasks: {
                          ...formData.tasks,
                          fer: {
                            ...formData.tasks.fer,
                            fillerDeadline: e.target.value,
                          },
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter patent description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter>
            <Button type="submit">Add Patent</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
