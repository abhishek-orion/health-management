import { PaginationInfo } from "@/types/Pagination/Pagination";
import { PaginationParams } from "@/types/Pagination/Pagination";

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  gender: string;
}

export interface PatientContextType {
  patients: Patient[];
  pagination: PaginationInfo | null;
  setPatients: (patients: Patient[]) => void;
  getPatients: (params?: PaginationParams) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface PatientProviderProps {
  children: React.ReactNode;
}