export enum Role {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
}

export enum FieldStage {
  PLANTED = 'PLANTED',
  GROWING = 'GROWING',
  READY = 'READY',
  HARVESTED = 'HARVESTED',
}

export enum FieldStatus {
  COMPLETED = 'Completed',
  AT_RISK = 'At Risk',
  ACTIVE = 'Active',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Field {
  id: string;
  name: string;
  cropType: string;
  plantingDate: string | Date;
  stage: FieldStage;
  assignedAgentId: string | null;
  agent?: User | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface FieldUpdate {
  id: string;
  fieldId: string;
  agentId: string;
  note: string;
  stage: FieldStage;
  createdAt: string | Date;
  agent?: User;
}

export interface DashboardStats {
  totalFields: number;
  activeCount: number;
  atRiskCount: number;
  completedCount: number;
}
