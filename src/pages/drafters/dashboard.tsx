
import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DrafterKanbanBoard } from "@/components/drafters/DrafterKanbanBoard";
import { useToast } from "@/components/ui/use-toast";
import { DraftingTask } from "@/types/patent";

// Mock data - replace with actual API calls
const mockTasks: DraftingTask[] = [
  {
    id: "task1",
    patentId: "PAT001",
    patentTitle: "AI-Based Patent Analysis System",
    taskType: "drafting",
    status: "assigned",
    assignedTo: "user1",
    dueDate: "2024-03-15",
    priority: "High",
  },
  {
    id: "task2",
    patentId: "PAT002",
    patentTitle: "Blockchain Patent Management",
    taskType: "drafting",
    status: "assigned",
    assignedTo: "user1",
    dueDate: "2024-03-20",
    priority: "Medium",
  },
];

export default function DrafterDashboardPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(mockTasks);

  const handleTaskUpdate = (taskId: string, newStatus: "assigned" | "completed") => {
    // Update task status
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));

    toast({
      title: "Task Updated",
      description: `Task has been marked as ${newStatus}`,
    });
  };

  return (
    <SidebarProvider>
      <div className="layout-container">
        <AppSidebar />
        <main className="main-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Drafter Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your drafting tasks and track progress
              </p>
            </div>
            <SidebarTrigger />
          </div>

          <DrafterKanbanBoard tasks={tasks} onTaskUpdate={handleTaskUpdate} />
        </main>
      </div>
    </SidebarProvider>
  );
}
