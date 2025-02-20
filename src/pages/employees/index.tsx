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
import { MoreHorizontal } from "lucide-react";
import { AddEmployeeDialog } from "@/components/dialogs/AddEmployeeDialog";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import { EmployeeDetailsDialog } from "@/components/dialogs/EmployeeDetailsDialog";
import { useNavigate } from "react-router-dom";

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Drafter",
    status: "Active",
    joinedDate: "2024-01-15",
    patentsCount: 12,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Filler",
    status: "Active",
    joinedDate: "2024-02-01",
    patentsCount: 8,
  },
];

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  const handleDeleteConfirm = () => {
    console.log("Deleting employee:", selectedEmployee);
    setDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleOpenDetails = (employeeId: number) => {
    setSelectedEmployee(employeeId);
    setDetailsDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleOpenDelete = (employeeId: number) => {
    setSelectedEmployee(employeeId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <SidebarProvider>
      <div className="layout-container">
        <AppSidebar />
        <main className="main-content">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
              <p className="text-muted-foreground">
                Manage your organization's employees and their roles.
              </p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 flex-1">
              <Input
                placeholder="Search employees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Patents</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.status}</TableCell>
                    <TableCell>{employee.patentsCount} Patents</TableCell>
                    <TableCell>{employee.joinedDate}</TableCell>
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
                            onClick={() => handleOpenDetails(employee.id)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/employees/${employee.id}/patents`)}
                          >
                            View Patents
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleOpenDelete(employee.id)}
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

          <AddEmployeeDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
          />

          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={handleCloseDelete}
            onConfirm={handleDeleteConfirm}
            title="Delete Employee"
            description="Are you sure you want to delete this employee? This action cannot be undone."
          />

          <EmployeeDetailsDialog 
            open={detailsDialogOpen}
            onOpenChange={handleCloseDetails}
            employeeId={selectedEmployee}
          />
        </main>
      </div>
    </SidebarProvider>
  );
}
