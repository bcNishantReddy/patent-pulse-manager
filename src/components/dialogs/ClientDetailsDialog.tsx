
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ClientDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string | null;
}

// Mock client data for demonstration
const clientData = {
  id: "1",
  name: "Acme Corporation",
  contactPerson: "John Doe",
  email: "john@acme.com",
  phone: "+1 234 567 890",
  address: "123 Business Street, Tech City, TC 12345",
  totalPatents: 5,
  activePatents: 3,
  completedPatents: 2,
  joinedDate: "2024-01-15",
};

export function ClientDetailsDialog({
  open,
  onOpenChange,
  clientId,
}: ClientDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">{clientData.name}</h3>
            <p className="text-sm text-muted-foreground">
              Client since {clientData.joinedDate}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Contact Information</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Contact Person</p>
                  <p className="text-sm text-muted-foreground">
                    {clientData.contactPerson}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {clientData.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {clientData.phone}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Address</Label>
              <p className="text-sm text-muted-foreground">
                {clientData.address}
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Patent Statistics</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Badge variant="outline" className="w-full justify-center">
                    {clientData.totalPatents}
                  </Badge>
                  <p className="text-sm text-center mt-1">Total Patents</p>
                </div>
                <div>
                  <Badge variant="secondary" className="w-full justify-center">
                    {clientData.activePatents}
                  </Badge>
                  <p className="text-sm text-center mt-1">Active Patents</p>
                </div>
                <div>
                  <Badge variant="default" className="w-full justify-center">
                    {clientData.completedPatents}
                  </Badge>
                  <p className="text-sm text-center mt-1">Completed Patents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
