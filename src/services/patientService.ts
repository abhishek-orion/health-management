import { Patient } from "@/contexts/PatientContext/PatientContext.d";
import {
  PaginationParams,
  PaginatedResponse,
} from "@/types/Pagination/Pagination";
import { simulateApiCall } from '@/utils/apiSimulator';
import { getApiUrl, API_CONFIG } from '../config/api';
import { withErrorHandler } from './apiErrorHandler';


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

    const url = `${getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)}${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;

    return withErrorHandler<PaginatedResponse<Patient>>(
      () => fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
      "fetching patients"
    );
  },

  async getPatientById(id: string): Promise<Patient> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 200, maxLatency: 1200, errorRate: 5 });

    return withErrorHandler<Patient>(
      () => fetch(`${getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
      `fetching patient ${id}`
    );
  },

  async createPatient(
    patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">
  ): Promise<Patient> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 400, maxLatency: 2000, errorRate: 3 });

    return withErrorHandler<Patient>(
      () => fetch(getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      }),
      "creating patient"
    );
  },

  async updatePatient(
    id: string,
    patientData: Partial<Omit<Patient, "id" | "createdAt" | "updatedAt">>
  ): Promise<Patient> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 300, maxLatency: 1800, errorRate: 3 });
    
    const url = `${getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)}/${id}`;
  
    return withErrorHandler<Patient>(
      () => fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      }),
      `updating patient ${id}`
    );
  },

  async deletePatient(
    id: string
  ): Promise<{ message: string; patient: Patient }> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 250, maxLatency: 1000, errorRate: 2 });

    return withErrorHandler<{ message: string; patient: Patient }>(
      () => fetch(`${getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      `deleting patient ${id}`
    );
  },
};

export default patientService;
