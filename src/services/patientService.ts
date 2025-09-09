import { Patient } from "@/contexts/PatientContext/PatientContext.d";
import {
  PaginationParams,
  PaginatedResponse,
} from "@/types/Pagination/Pagination";
import { simulateApiCall } from '@/utils/apiSimulator';
import { API_CONFIG } from '../config/api';
import { createApiMethod } from './apiErrorHandler';


const patientService = {
  async getPatients(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Patient>> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 300, maxLatency: 1500, errorRate: 8 });
    
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const endpoint = `${API_CONFIG.ENDPOINTS.PATIENTS}${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
    const apiCall = createApiMethod<undefined, PaginatedResponse<Patient>>(endpoint, 'GET', '');

    return apiCall(undefined, { context: "fetching patients" });
  },

  async getPatientById(id: string): Promise<Patient> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 200, maxLatency: 1200, errorRate: 5 });

    const apiCall = createApiMethod<undefined, Patient>(`${API_CONFIG.ENDPOINTS.PATIENTS}/${id}`, 'GET', '');
    return apiCall(undefined, { context: `fetching patient ${id}` });
  },

  async createPatient(
    patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">
  ): Promise<Patient> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 400, maxLatency: 2000, errorRate: 3 });

    const apiCall = createApiMethod<Omit<Patient, "id" | "createdAt" | "updatedAt">, Patient>(API_CONFIG.ENDPOINTS.PATIENTS, 'POST', '');
    return apiCall(patientData, { context: "creating patient" });
  },

  async updatePatient(
    id: string,
    patientData: Partial<Omit<Patient, "id" | "createdAt" | "updatedAt">>
  ): Promise<Patient> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 300, maxLatency: 1800, errorRate: 3 });
    
    const apiCall = createApiMethod<Partial<Omit<Patient, "id" | "createdAt" | "updatedAt">>, Patient>(`${API_CONFIG.ENDPOINTS.PATIENTS}/${id}`, 'PUT', '');
    return apiCall(patientData, { context: `updating patient ${id}` });
  },

  async deletePatient(
    id: string
  ): Promise<{ message: string; patient: Patient }> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 250, maxLatency: 1000, errorRate: 2 });

    const apiCall = createApiMethod<undefined, { message: string; patient: Patient }>(`${API_CONFIG.ENDPOINTS.PATIENTS}/${id}`, 'DELETE', '');
    return apiCall(undefined, { context: `deleting patient ${id}` });
  },
};

export default patientService;
