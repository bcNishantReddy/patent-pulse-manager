
import { FileText, Users, Clock, AlertCircle } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { PatentChart } from "@/components/dashboard/PatentChart";

const stats = [
  {
    title: "Total Patents",
    value: "142",
    description: "12 new this month",
    icon: <FileText className="w-5 h-5 text-primary" />,
  },
  {
    title: "Active Employees",
    value: "24",
    description: "3 pending approval",
    icon: <Users className="w-5 h-5 text-primary" />,
  },
  {
    title: "Pending Tasks",
    value: "38",
    description: "5 due today",
    icon: <Clock className="w-5 h-5 text-primary" />,
  },
  {
    title: "Critical Updates",
    value: "7",
    description: "2 require immediate action",
    icon: <AlertCircle className="w-5 h-5 text-primary" />,
  },
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="layout-container">
        <AppSidebar />
        <main className="main-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back. Here's what's happening today.
              </p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <PatentChart />
            <div className="dashboard-card">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {/* We'll implement this later */}
                <p className="text-sm text-muted-foreground">
                  Recent activity will be shown here
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
