import { createContext, useState, useContext } from "react";
import { Patient, PatientContextType, PatientProviderProps } from "@/contexts/PatientContext/PatientContext.d";
import patientService from "@/services/patientService";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { PaginationParams, PaginationInfo } from "@/types/Pagination/Pagination";



export const PatientContext = createContext<PatientContextType>({
  patients: [],
  pagination: null,
  setPatients: () => {},
  getPatients: async () => {},
  loading: false,
  error: null,
});

export const PatientProvider = ({
  children,
}: PatientProviderProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const errorHandler = useErrorHandler();

  const getPatients = async (params?: PaginationParams) => {
    try {
      setLoading(true);
      setError(null);
      errorHandler.clearError();
      
      const response = await patientService.getPatients(params);
      setPatients(response.data);
      setPagination(response.pagination);
      setLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch patients";
      setError(errorMessage);
      setLoading(false);
    }
  };

  const value: PatientContextType = {
    patients,
    pagination,
    setPatients,
    getPatients,
    loading,
    error,
  };

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};

export const usePatient = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
};
