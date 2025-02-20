
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface EmployeeDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: number | null;
}

// Mock data for demonstration
const employeeData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "Drafter",
  status: "Active",
  department: "Patents",
  phone: "+1 234 567 890",
  joinedDate: "2024-01-15",
  patentStats: {
    total: 12,
    completed: 8,
    inProgress: 4,
    drafting: 2,
    filing: 2,
  },
};

export function EmployeeDetailsDialog({
  open,
  onOpenChange,
  employeeId,
}: EmployeeDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">{employeeData.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge>{employeeData.role}</Badge>
              <Badge variant="outline">{employeeData.status}</Badge>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Contact Information</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {employeeData.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {employeeData.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-sm text-muted-foreground">
                    {employeeData.department}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Joined Date</p>
                  <p className="text-sm text-muted-foreground">
                    {employeeData.joinedDate}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Patent Statistics</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Badge variant="outline" className="w-full justify-center">
                    {employeeData.patentStats.total}
                  </Badge>
                  <p className="text-sm text-center mt-1">Total Patents</p>
                </div>
                <div>
                  <Badge variant="secondary" className="w-full justify-center">
                    {employeeData.patentStats.inProgress}
                  </Badge>
                  <p className="text-sm text-center mt-1">In Progress</p>
                </div>
                <div>
                  <Badge variant="default" className="w-full justify-center">
                    {employeeData.patentStats.completed}
                  </Badge>
                  <p className="text-sm text-center mt-1">Completed</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Badge variant="secondary" className="w-full justify-center">
                    {employeeData.patentStats.drafting}
                  </Badge>
                  <p className="text-sm text-center mt-1">Drafting</p>
                </div>
                <div>
                  <Badge variant="secondary" className="w-full justify-center">
                    {employeeData.patentStats.filing}
                  </Badge>
                  <p className="text-sm text-center mt-1">Filing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
