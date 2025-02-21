
import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FillerTaskCard } from "@/components/fillers/FillerTaskCard";
import { useToast } from "@/components/ui/use-toast";
import { FilingTask } from "@/types/patent";

// Mock data - replace with actual API calls
const mockTasks: FilingTask[] = [
  {
    id: "task1",
    patentId: "PAT001",
    patentTitle: "AI-Based Patent Analysis System",
    taskType: "filing",
    status: "assigned",
    assignedTo: "user1",
    dueDate: "2024-03-15",
    priority: "High",
    forms: [
      { id: "form1", name: "Application Form", completed: false },
      { id: "form2", name: "Declaration Form", completed: false },
      { id: "form3", name: "Power of Attorney", completed: false },
    ],
  },
];

export default function FillerDashboardPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(mockTasks);

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: "completed" } : task
    ));

    toast({
      title: "Task Completed",
      description: "All forms have been completed and submitted.",
    });
  };

  return (
    <SidebarProvider>
      <div className="layout-container">
        <AppSidebar />
        <main className="main-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Filler Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your filing tasks and track forms
              </p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <FillerTaskCard
                key={task.id}
                task={task}
                onComplete={handleTaskComplete}
              />
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
