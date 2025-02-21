
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { DraftingTask } from "@/types/patent";

interface DrafterKanbanBoardProps {
  tasks: DraftingTask[];
  onTaskUpdate: (taskId: string, newStatus: "assigned" | "completed") => void;
}

export function DrafterKanbanBoard({ tasks, onTaskUpdate }: DrafterKanbanBoardProps) {
  const { toast } = useToast();
  const [localTasks, setLocalTasks] = useState(tasks);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // Only allow moving from assigned to completed
    if (source.droppableId === "completed" && destination.droppableId === "assigned") {
      toast({
        title: "Action not allowed",
        description: "Completed tasks cannot be moved back to assigned.",
        variant: "destructive",
      });
      return;
    }

    const updatedTasks = [...localTasks];
    const taskIndex = updatedTasks.findIndex((t) => t.id === draggableId);
    
    if (taskIndex !== -1) {
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        status: destination.droppableId as "assigned" | "completed",
      };
      setLocalTasks(updatedTasks);
      onTaskUpdate(draggableId, destination.droppableId as "assigned" | "completed");
    }
  };

  const columns = {
    assigned: localTasks.filter((task) => task.status === "assigned"),
    completed: localTasks.filter((task) => task.status === "completed"),
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Assigned Tasks</h3>
          <Droppable droppableId="assigned">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {columns.assigned.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base font-medium">
                              {task.patentTitle}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center gap-2 mb-2">
                              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Due: {task.dueDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
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
                              <Badge variant="outline">{task.taskType}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Completed Tasks</h3>
          <Droppable droppableId="completed">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {columns.completed.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card className="bg-muted">
                          <CardHeader className="p-4">
                            <CardTitle className="text-base font-medium">
                              {task.patentTitle}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center gap-2 mb-2">
                              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Completed
                              </span>
                            </div>
                            <Badge variant="outline">{task.taskType}</Badge>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}
