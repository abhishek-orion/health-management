import { Patient } from "@/contexts/PatientContext/PatientContext.d";
import { PaginationInfo } from "@/types/Pagination/Pagination";
import { PaginationParams } from "@/types/Pagination/Pagination";

export interface PatientsTableProps {
  patients: Patient[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  onPaginationChange: (params: PaginationParams) => Promise<void>;
}

export type SortField =
  | "id"
  | "name"
  | "email"
  | "phone"
  | "dob"
  | "gender"
  | "createdAt"
  | "updatedAt";
  
export type SortDirection = "asc" | "desc" | null;
