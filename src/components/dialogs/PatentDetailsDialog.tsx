
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PatentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patentId: string | null;
}

// Mock data for demonstration
const patentDetails = {
  id: "PAT-001",
  title: "AI-Based Patent Analysis",
  status: "CS Drafting",
  timeline: [
    {
      task: "PS Drafting",
      assignee: "John Doe",
      startDate: "2024-02-01",
      completedDate: "2024-02-05",
      duration: "4 days",
      status: "Completed",
    },
    {
      task: "PS Filing",
      assignee: "Jane Smith",
      startDate: "2024-02-06",
      completedDate: "2024-02-08",
      duration: "2 days",
      status: "Completed",
    },
    {
      task: "CS Drafting",
      assignee: "Mike Johnson",
      startDate: "2024-02-09",
      completedDate: null,
      duration: "Ongoing",
      status: "In Progress",
    },
  ],
  metadata: {
    internalId: "INT-001",
    inventors: "Alice Brown, Bob Wilson",
    assignee: "TechCorp Inc",
    priority: "High",
    client: "Acme Corporation",
  },
};

export function PatentDetailsDialog({
  open,
  onOpenChange,
  patentId,
}: PatentDetailsDialogProps) {
  const handleDownload = () => {
    // Implement download logic
    console.log("Downloading details for patent:", patentId);
  };

  const handleShare = () => {
    // Implement share logic
    console.log("Sharing details for patent:", patentId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Patent Details</DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[600px] pr-4">
          <div className="space-y-6">
            {/* Patent Overview */}
            <Card>
              <CardHeader>
                <CardTitle>{patentDetails.title}</CardTitle>
                <CardDescription>
                  Internal ID: {patentDetails.metadata.internalId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Inventors</p>
                    <p className="text-sm text-muted-foreground">
                      {patentDetails.metadata.inventors}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Assignee</p>
                    <p className="text-sm text-muted-foreground">
                      {patentDetails.metadata.assignee}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Priority</p>
                    <Badge variant="secondary">
                      {patentDetails.metadata.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Client</p>
                    <p className="text-sm text-muted-foreground">
                      {patentDetails.metadata.client}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-6">
                  {patentDetails.timeline.map((event, index) => (
                    <div key={index} className="relative pl-6">
                      {index < patentDetails.timeline.length - 1 && (
                        <div className="absolute left-2 top-6 bottom-0 w-px bg-border" />
                      )}
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{event.task}</h4>
                          <Badge
                            variant={event.status === "Completed" ? "default" : "secondary"}
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Assigned to: {event.assignee}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Started: {event.startDate}
                          {event.completedDate && ` • Completed: ${event.completedDate}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Duration: {event.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
