
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface EditPatentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patentId: string;
}

export function EditPatentDialog({
  open,
  onOpenChange,
  patentId,
}: EditPatentDialogProps) {
  const [formData, setFormData] = useState({
    internalId: "PAT-001",
    title: "AI-Based Patent Analysis",
    inventors: "John Doe, Jane Smith",
    assignee: "TechCorp",
    priority: "high",
    description: "Sample description",
    clientId: "1",
    tasks: {
      ps: {
        drafter: "drafter1",
        filler: "filler1",
        drafterDeadline: "2024-03-01",
        fillerDeadline: "2024-03-15",
      },
      cs: {
        drafter: "drafter2",
        filler: "filler2",
        drafterDeadline: "2024-04-01",
        fillerDeadline: "2024-04-15",
      },
      fer: {
        drafter: "drafter1",
        filler: "filler2",
        drafterDeadline: "2024-05-01",
        fillerDeadline: "2024-05-15",
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Patent</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="internalId">Internal ID</Label>
            <Input
              id="internalId"
              value={formData.internalId}
              onChange={(e) =>
                setFormData({ ...formData, internalId: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <Tabs defaultValue="ps" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ps">PS Task</TabsTrigger>
              <TabsTrigger value="cs">CS Task</TabsTrigger>
              <TabsTrigger value="fer">FER Task</TabsTrigger>
            </TabsList>
            
            {/* PS Task */}
            <TabsContent value="ps" className="space-y-4">
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
                  />
                </div>
              </div>
            </TabsContent>

            {/* CS Task */}
            <TabsContent value="cs" className="space-y-4">
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
                  />
                </div>
              </div>
            </TabsContent>

            {/* FER Task */}
            <TabsContent value="fer" className="space-y-4">
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
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
