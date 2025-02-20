
import { useState } from "react";
import { Plus } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { AddPatentDialog } from "@/components/dialogs/AddPatentDialog";
import { EditPatentDialog } from "@/components/dialogs/EditPatentDialog";
import { PatentDetailsDialog } from "@/components/dialogs/PatentDetailsDialog";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import { SearchFilters } from "@/components/search/SearchFilters";

const patents = [
  {
    id: "PAT-001",
    title: "Method for AI-Based Patent Analysis",
    status: "Drafting",
    assignee: "John Doe",
    filingDate: "2024-02-15",
    priority: "High",
  },
  {
    id: "PAT-002",
    title: "System for Automated Patent Classification",
    status: "Review",
    assignee: "Jane Smith",
    filingDate: "2024-01-30",
    priority: "Medium",
  },
];

const statusColors = {
  Drafting: "bg-blue-100 text-blue-800",
  Review: "bg-yellow-100 text-yellow-800",
  Filing: "bg-purple-100 text-purple-800",
  Granted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function PatentsPage() {
  const [search, setSearch] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState<string | null>(null);

  const handleFiltersChange = (filters: any) => {
    console.log("Filters changed:", filters);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting patent:", selectedPatent);
    setDeleteDialogOpen(false);
    setSelectedPatent(null);
  };

  return (
    <SidebarProvider>
      <div className="layout-container">
        <AppSidebar />
        <main className="main-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Patents</h1>
              <p className="text-muted-foreground">
                Manage and track all patent applications.
              </p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 flex-1">
              <Input
                placeholder="Search patents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
              <SearchFilters onFiltersChange={handleFiltersChange} />
            </div>
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Patent
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patent ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Filing Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patents.map((patent) => (
                  <TableRow key={patent.id}>
                    <TableCell className="font-medium">
                      {patent.id}
                    </TableCell>
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
                    <TableCell>{patent.filingDate}</TableCell>
                    <TableCell>{patent.priority}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPatent(patent.id);
                              setViewDetailsOpen(true);
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPatent(patent.id);
                              setEditDialogOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>Assign</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedPatent(patent.id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <AddPatentDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
          />

          {selectedPatent && (
            <EditPatentDialog
              open={editDialogOpen}
              onOpenChange={setEditDialogOpen}
              patentId={selectedPatent}
            />
          )}

          <PatentDetailsDialog
            open={viewDetailsOpen}
            onOpenChange={setViewDetailsOpen}
            patentId={selectedPatent}
          />

          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={handleDeleteConfirm}
            title="Delete Patent"
            description="Are you sure you want to delete this patent? This action cannot be undone."
          />
        </main>
      </div>
    </SidebarProvider>
  );
}
