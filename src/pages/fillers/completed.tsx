
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
import { FilingTask } from "@/types/patent";

// Mock data - replace with actual API calls
const mockCompletedTasks: FilingTask[] = [
  {
    id: "task2",
    patentId: "PAT002",
    patentTitle: "Blockchain Patent Management",
    taskType: "filing",
    status: "completed",
    assignedTo: "user1",
    dueDate: "2024-02-28",
    priority: "High",
    forms: [
      { id: "form1", name: "Application Form", completed: true },
      { id: "form2", name: "Declaration Form", completed: true },
      { id: "form3", name: "Power of Attorney", completed: true },
    ],
  },
];

export default function FillerCompletedPage() {
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
                View your completed filing tasks
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
                  <TableHead>Forms Completed</TableHead>
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
                    <TableCell>
                      {task.forms.filter(f => f.completed).length} / {task.forms.length}
                    </TableCell>
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
