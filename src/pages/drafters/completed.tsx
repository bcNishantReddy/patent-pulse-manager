
import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DraftingTask } from "@/types/patent";

// Mock data - replace with actual API calls
const mockCompletedTasks: DraftingTask[] = [
  {
    id: "task3",
    patentId: "PAT003",
    patentTitle: "Machine Learning Patent System",
    taskType: "drafting",
    status: "completed",
    assignedTo: "user1",
    dueDate: "2024-02-28",
    priority: "High",
  },
];

export default function DrafterCompletedPage() {
  const [search, setSearch] = useState("");
  const [tasks] = useState(mockCompletedTasks);

  const filteredTasks = tasks.filter(task =>
    task.patentTitle.toLowerCase().includes(search.toLowerCase()) ||
    task.patentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="layout-container">
        <AppSidebar />
        <main className="main-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Completed Tasks</h1>
              <p className="text-muted-foreground">
                View your completed drafting tasks
              </p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Input
              placeholder="Search completed tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patent ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Completion Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.patentId}</TableCell>
                    <TableCell>{task.patentTitle}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          task.priority === "High"
                            ? "destructive"
                            : task.priority === "Medium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
