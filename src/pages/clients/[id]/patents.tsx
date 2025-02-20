
import { useState } from "react";
import { useParams } from "react-router-dom";
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
import { MoreHorizontal, ArrowLeft } from "lucide-react";
import { EditPatentDialog } from "@/components/dialogs/EditPatentDialog";
import { PatentDetailsDialog } from "@/components/dialogs/PatentDetailsDialog";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";

const statusColors = {
  "PS Drafting": "bg-blue-100 text-blue-800",
  "PS Filing": "bg-indigo-100 text-indigo-800",
  "CS Drafting": "bg-purple-100 text-purple-800",
  "CS Filing": "bg-pink-100 text-pink-800",
  "FER Drafting": "bg-orange-100 text-orange-800",
  "FER Filing": "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
};

export default function ClientPatentsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedPatent, setSelectedPatent] = useState<string | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Mock client data
  const clientData = {
    name: "Acme Corporation",
    patents: [
      {
        id: "PAT-001",
        title: "AI-Based Patent Analysis",
        status: "CS Drafting",
        assignee: "John Doe",
        priority: "High",
        lastUpdated: "2024-02-20",
      },
      {
        id: "PAT-002",
        title: "Machine Learning System",
        status: "PS Filing",
        assignee: "Jane Smith",
        priority: "Medium",
        lastUpdated: "2024-02-18",
      },
    ],
  };

  const handleDelete = () => {
    console.log("Deleting patent:", selectedPatent);
    setDeleteDialogOpen(false);
    setSelectedPatent(null);
  };

  return (
    <SidebarProvider>
      <div className="layout-container">
        <AppSidebar />
        <main className="main-content">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/clients")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {clientData.name} - Patents
              </h1>
              <p className="text-muted-foreground">
                Manage all patents for this client
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mb-6">
            <Input
              placeholder="Search patents..."
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
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientData.patents.map((patent) => (
                  <TableRow key={patent.id}>
                    <TableCell className="font-medium">{patent.id}</TableCell>
                    <TableCell>{patent.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          statusColors[patent.status as keyof typeof statusColors]
                        }
                      >
                        {patent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{patent.assignee}</TableCell>
                    <TableCell>{patent.priority}</TableCell>
                    <TableCell>{patent.lastUpdated}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
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

          <PatentDetailsDialog
            open={viewDetailsOpen}
            onOpenChange={setViewDetailsOpen}
            patentId={selectedPatent}
          />

          {selectedPatent && (
            <EditPatentDialog
              open={editDialogOpen}
              onOpenChange={setEditDialogOpen}
              patentId={selectedPatent}
            />
          )}

          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={handleDelete}
            title="Delete Patent"
            description="Are you sure you want to delete this patent? This action cannot be undone."
          />
        </main>
      </div>
    </SidebarProvider>
  );
}
