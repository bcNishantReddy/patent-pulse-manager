
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    internalId: "",
    status: "",
    priority: "",
    assignee: "",
    client: "",
    drafter: "",
    filler: "",
    dateRange: "",
    taskType: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Search Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label>Internal ID</Label>
            <Input
              value={filters.internalId}
              onChange={(e) => handleFilterChange("internalId", e.target.value)}
              placeholder="Search by internal ID"
            />
          </div>

          <div className="space-y-2">
            <Label>Task Type</Label>
            <Select
              value={filters.taskType}
              onValueChange={(value) => handleFilterChange("taskType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ps">PS</SelectItem>
                <SelectItem value="cs">CS</SelectItem>
                <SelectItem value="fer">FER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drafting">Drafting</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="filing">Filing</SelectItem>
                <SelectItem value="granted">Granted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={filters.priority}
              onValueChange={(value) => handleFilterChange("priority", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Drafter</Label>
            <Select
              value={filters.drafter}
              onValueChange={(value) => handleFilterChange("drafter", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select drafter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drafter1">Drafter 1</SelectItem>
                <SelectItem value="drafter2">Drafter 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Filler</Label>
            <Select
              value={filters.filler}
              onValueChange={(value) => handleFilterChange("filler", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select filler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filler1">Filler 1</SelectItem>
                <SelectItem value="filler2">Filler 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <Select
              value={filters.dateRange}
              onValueChange={(value) => handleFilterChange("dateRange", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7">Last 7 days</SelectItem>
                <SelectItem value="last-30">Last 30 days</SelectItem>
                <SelectItem value="last-90">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={() => {
              setFilters({
                internalId: "",
                status: "",
                priority: "",
                assignee: "",
                client: "",
                drafter: "",
                filler: "",
                dateRange: "",
                taskType: "",
              });
              onFiltersChange({});
            }}
            variant="outline"
          >
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
