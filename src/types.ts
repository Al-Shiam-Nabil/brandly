export type Reminder = {
  id: string;
  title: string;
  time: string;
  date: string;
  type: "Call" | "Meeting" | "Email" | "Follow-up";
  contactName: string;
  priority: "Low" | "Medium" | "High";
};

export type Task = {
  id: string;
  title: string;
  startDate: string;
  deadline: string;
  status: "In Progress" | "Completed" | "Pending" | "Overdue";
  priority: "High" | "Medium" | "Low";
  assignee: {
    name: string;
    avatar: string;
  };
};

export type TodosType = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum Status {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export enum Category {
  SALES = "Sales",
  MARKETING = "Marketing",
  FOLLOW_UP = "Follow Up",
  TECHNICAL = "Technical",
  GENERAL = "General",
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  category: Category;
  relatedLead?: string;
  createdAt: string;
}

export interface TodoFilter {
  search: string;
  status: Status | "All";
  priority: Priority | "All";
  category: Category | "All";
}

export enum EventType {
  MEETING = "Meeting",
  CALL = "Call",
  WORKSHOP = "Workshop",
  CONFERENCE = "Conference",
  PERSONAL = "Personal",
}

export interface CRMEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO Date YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  type: EventType;
  location?: string;
  attendees?: string[];
}

export enum ProjectStatus {
  PLANNING = "Planning",
  ACTIVE = "Active",
  ON_HOLD = "On Hold",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export interface Project {
  id: string;
  title: string;
  client: string;
  startDate: string;
  deadline: string;
  progress: number; // 0 to 100
  status: ProjectStatus;
}

export enum TaskStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  DEFERRED = "Deferred",
  REVIEW = "Under Review",
}

export interface CRMTask {
  id: string;
  title: string;
  startDate: string;
  deadline: string;
  milestone: string;
  relatedTo: string;
  assignedTo: string;
  assignedToAvatar?: string;
  collaborators: { name: string; avatar: string }[];
  status: TaskStatus;
}

export interface CRMNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  files: string[];
}

export interface CRMFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  owner: string;
  sharedWith: { name: string; avatar: string }[];
}

export enum MemberStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export interface CRMTeamMember {
  id: string;
  name: string;
  jobTitle: string;
  email: string;
  department: string;
  image: string;
  status: MemberStatus;
  joinedDate: string;
}

export enum LeaveType {
  VACATION = "Vacation",
  SICK_LEAVE = "Sick Leave",
  PERSONAL = "Personal",
  MATERNITY = "Maternity",
  PATERNITY = "Paternity",
  BEREAVEMENT = "Bereavement",
}

export enum LeaveStatus {
  APPROVED = "Approved",
  PENDING = "Pending",
  REJECTED = "Rejected",
}

export interface CRMLeave {
  id: string;
  memberId: string;
  memberName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  duration: number; // in days
  status: LeaveStatus;
  reason: string;
  appliedDate: string;
}
