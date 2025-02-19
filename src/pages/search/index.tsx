
import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { SearchFilters } from "@/components/search/SearchFilters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { PatentDetailsDialog } from "@/components/dialogs/PatentDetailsDialog";

const statusColors = {
  "PS Drafting": "bg-blue-100 text-blue-800",
  "PS Filing": "bg-indigo-100 text-indigo-800",
  "CS Drafting": "bg-purple-100 text-purple-800",
  "CS Filing": "bg-pink-100 text-pink-800",
  "FER Drafting": "bg-orange-100 text-orange-800",
  "FER Filing": "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
};

const searchResults = [
  {
    id: "PAT-001",
    title: "AI-Based Patent Analysis",
    status: "CS Drafting",
    assignee: "John Doe",
    priority: "High",
    lastUpdated: "2024-02-20",
  },
  // Add more mock data as needed
];

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [selectedPatent, setSelectedPatent] = useState<string | null>(null);

  const handleFiltersChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // Implement filter logic
  };

  return (
    <SidebarProvider>
      <div className="layout-container">
        <AppSidebar />
        <main className="main-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Search Patents</h1>
              <p className="text-muted-foreground">
                Search and filter through all patent applications
              </p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 flex-1">
              <Input
                placeholder="Search patents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
              <SearchFilters onFiltersChange={handleFiltersChange} />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patent ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((patent) => (
                  <TableRow key={patent.id}>
                    <TableCell className="font-medium">{patent.id}</TableCell>
                    <TableCell>{patent.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[patent.status as keyof typeof statusColors]}
                      >
                        {patent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{patent.assignee}</TableCell>
                    <TableCell>{patent.priority}</TableCell>
                    <TableCell>{patent.lastUpdated}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedPatent(patent.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
      <PatentDetailsDialog
        open={!!selectedPatent}
        onOpenChange={() => setSelectedPatent(null)}
        patentId={selectedPatent}
      />
    </SidebarProvider>
  );
}
