
export type PatentStatus = 
  | "PS Drafting"
  | "PS Filing"
  | "CS Drafting"
  | "CS Filing"
  | "FER Drafting"
  | "FER Filing"
  | "Completed";

export type TaskType = "drafting" | "filing";

export interface PatentTask {
  id: string;
  patentId: string;
  patentTitle: string;
  taskType: TaskType;
  status: "assigned" | "completed";
  assignedTo: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
}

export interface FilingTask extends PatentTask {
  taskType: "filing";
  forms: {
    id: string;
    name: string;
    completed: boolean;
  }[];
}

export interface DraftingTask extends PatentTask {
  taskType: "drafting";
}
