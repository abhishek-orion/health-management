import { Patient } from "@/contexts/PatientContext/PatientContext.d";
import {
  PaginationParams,
  PaginatedResponse,
} from "@/types/Pagination/Pagination";
import { simulateApiCall } from '@/utils/apiSimulator';
import { getApiUrl, API_CONFIG } from '../config/api.ts';

async function handleResponseError(response: Response, entityName: string): Promise<Response> {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized: Please log in again");
    }
    if (response.status === 404) {
      throw new Error(`${entityName} not found`);
    }
    throw new Error(`Failed to process ${entityName.toLowerCase()}: ${response.statusText}`);
  }
  return response;
}

const patientService = {
  async getPatients(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Patient>> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 300, maxLatency: 1500, errorRate: 8 });
    
    const token = localStorage.getItem("token");

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const url = `${getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)}${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;

    const response = await fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    await handleResponseError(response, "Patient");
    
    const result = await response.json();
    return result as PaginatedResponse<Patient>;
  },

  async getPatientById(id: string): Promise<Patient> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 200, maxLatency: 1200, errorRate: 5 });
    
    const token = localStorage.getItem("token");

    const response = await fetch(`${getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)}/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    await handleResponseError(response, "Patient");
    return response.json();
  },

  async createPatient(
    patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">
  ): Promise<Patient> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 400, maxLatency: 2000, errorRate: 3 });
    
    const token = localStorage.getItem("token");

    const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS), {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });

    await handleResponseError(response, "Patient");
    return response.json();
  },

  async updatePatient(
    id: string,
    patientData: Partial<Omit<Patient, "id" | "createdAt" | "updatedAt">>
  ): Promise<Patient> {
    
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 300, maxLatency: 1800, errorRate: 3 });
    
    const token = localStorage.getItem("token");
    const url = `${getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)}/${id}`;
  
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });

    await handleResponseError(response, "Patient");
    const result = await response.json();
    return result;
  },

  async deletePatient(
    id: string
  ): Promise<{ message: string; patient: Patient }> {
    // Simulate network latency and occasional errors
    await simulateApiCall({ minLatency: 250, maxLatency: 1000, errorRate: 2 });
    
    const token = localStorage.getItem("token");

    const response = await fetch(`${getApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    await handleResponseError(response, "Patient");
    return response.json();
  },
};

export default patientService;
