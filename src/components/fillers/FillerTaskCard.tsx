
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { FilingTask } from "@/types/patent";
import { Label } from "@/components/ui/label";

interface FillerTaskCardProps {
  task: FilingTask;
  onComplete: (taskId: string) => void;
}

export function FillerTaskCard({ task, onComplete }: FillerTaskCardProps) {
  const [forms, setForms] = useState(task.forms);

  const handleFormToggle = (formId: string) => {
    setForms(forms.map(form => 
      form.id === formId ? { ...form, completed: !form.completed } : form
    ));
  };

  const allFormsCompleted = forms.every(form => form.completed);

  return (
    <Card className={task.status === "completed" ? "bg-muted" : ""}>
      <CardHeader className="p-4">
        <CardTitle className="text-base font-medium">{task.patentTitle}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Due: {task.dueDate}
          </span>
          <Badge
            variant={
              task.priority === "High"
                ? "destructive"
                : task.priority === "Medium"
                ? "default"
                : "secondary"
            }
          >
            {task.priority}
          </Badge>
        </div>
        
        <div className="space-y-3">
          {forms.map((form) => (
            <div key={form.id} className="flex items-center space-x-2">
              <Checkbox
                id={form.id}
                checked={form.completed}
                onCheckedChange={() => handleFormToggle(form.id)}
                disabled={task.status === "completed"}
              />
              <Label
                htmlFor={form.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {form.name}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
      {task.status !== "completed" && (
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() => onComplete(task.id)}
            disabled={!allFormsCompleted}
            className="w-full"
          >
            Complete Task
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
