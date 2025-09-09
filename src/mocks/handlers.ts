import { http, HttpResponse, delay } from "msw";
import { Patient, patients as originalPatients } from "./sampleData/patients-data";
import { 
  initializeAuthTokens, 
  cleanupExpiredTokens, 
  storeAuthToken,
  removeAuthToken,
  getAuthToken,
} from "./utils/handlerUtils";

// Create a persistent storage for patients data using sessionStorage
const PATIENTS_STORAGE_KEY = 'msw_patients_data';

const createPatientsStore = () => {
  const initializeData = () => {
    const stored = sessionStorage.getItem(PATIENTS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse stored patients data, using original');
      }
    }
    const initialData = [...originalPatients];
    sessionStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  };

  const saveData = (patients: Patient[]) => {
    sessionStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(patients));
  };

  return {
    getAll: () => {
      return initializeData();
    },
    findById: (id: string) => {
      const patients = initializeData();
      return patients.find((patient: Patient) => patient.id === parseInt(id));
    },
    findIndexById: (id: string) => {
      const patients = initializeData();
      return patients.findIndex((p: Patient) => p.id === parseInt(id));
    },
    update: (index: number, patient: Patient) => {
      const patients = initializeData();
      patients[index] = patient;
      saveData(patients);
      return patient;
    },
    add: (patient: Patient) => {
      const patients = initializeData();
      patients.push(patient);
      saveData(patients);
      return patient;
    },
    remove: (index: number) => {
      const patients = initializeData();
      const deleted = patients.splice(index, 1)[0];
      saveData(patients);
      return deleted;
    }
  };
};

const patientsStore = createPatientsStore();

// Initialize and clean up tokens on startup
initializeAuthTokens();
cleanupExpiredTokens();

const generateAuthToken = () => {
  return Math.random().toString(36).substring(2, 15);
};

const validateAuth = (authHeader: string) => {
  if (!authHeader) {
    return { isValid: false, allowUnauthenticated: true };
  }

  // Extract token from "Bearer <token>" format
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : authHeader;

  const auth = getAuthToken(token);
  
  if (!auth || typeof auth !== "object" || !("expiresAt" in auth)) {
    return { isValid: false, allowUnauthenticated: false };
  }

  const authObj = auth as { expiresAt: number };
  
  if (Date.now() > authObj.expiresAt) {
    return { isValid: false, allowUnauthenticated: false, expired: true };
  }

  return { isValid: true, allowUnauthenticated: false };
};

const createAuthErrorResponse = (authResult: ReturnType<typeof validateAuth>) => {
  if (authResult.expired) {
    return HttpResponse.json({ message: "Token expired" }, { status: 401 });
  }
  return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
};

const requireAuth = (authResult: ReturnType<typeof validateAuth>) => {
  if (!authResult.isValid) {
    return createAuthErrorResponse(authResult);
  }
  return null;
};

const requireAuthOrAllow = (authResult: ReturnType<typeof validateAuth>) => {
  if (!authResult.isValid && !authResult.allowUnauthenticated) {
    return createAuthErrorResponse(authResult);
  }
  return null;
};

const filterAndPaginatePatients = (url: URL, patients: Patient[]) => {
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const search = url.searchParams.get('search') || '';
  const sortBy = url.searchParams.get('sortBy') || '';
  const sortOrder = url.searchParams.get('sortOrder') || 'asc';
  
  let filteredPatients = patients;
  if (search) {
    filteredPatients = patients.filter(patient => 
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search) ||
      patient.gender.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Apply sorting if sortBy is provided
  if (sortBy) {
    filteredPatients.sort((a, b) => {
      let aValue = a[sortBy as keyof Patient];
      let bValue = b[sortBy as keyof Patient];
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      // Handle dates
      if (sortBy === 'createdAt' || sortBy === 'updatedAt' || sortBy === 'dob') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }
      
      // Handle numbers
      if (sortBy === 'id') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  const total = filteredPatients.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedPatients = filteredPatients.slice(offset, offset + limit);
  
  return {
    data: paginatedPatients,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};

const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string };

    if (email === "admin@aisel.com" && password === "admin@123") {
      const newAuthToken = generateAuthToken();
      
      const tokenData = {
        email: "admin@aisel.com",
        role: "admin",
        expiresAt: Date.now() + 1000 * 60 * 60, // 1 hour
      };
      
      storeAuthToken(newAuthToken, tokenData);
      
      return HttpResponse.json({
        token: newAuthToken,
        user: {
          email: "admin@aisel.com",
          role: "admin",
        },
      });
    }
    if (email === "user@aisel.com" && password === "user@123") {
      const newAuthToken = generateAuthToken();
      
      const tokenData = {
        email: "user@aisel.com",
        role: "user",
        expiresAt: Date.now() + 1000 * 60 * 60,
      };
      
      storeAuthToken(newAuthToken, tokenData);
      
      return HttpResponse.json({
        token: newAuthToken,
        user: {
          email: "user@aisel.com",
          role: "user",
        },
      });
    }
    // Return error if invalid credentials
    return HttpResponse.json(
      {
        message: "Unauthorized: User not found or invalid credentials",
      },
      { status: 401 }
    );
  }),
  http.get("/api/patients", async ({ request }) => {
    
    const authHeader = request.headers.get("Authorization") || "";
    const authResult = validateAuth(authHeader);

    const authError = requireAuthOrAllow(authResult);
    if (authError) return authError;

    const url = new URL(request.url);
    const result = filterAndPaginatePatients(url, patientsStore.getAll());
    await delay(500);
    return HttpResponse.json(result);
  }),
  http.get("/api/patients/:id", async ({ request, params }) => {
    const authHeader = request.headers.get("Authorization") || "";
    const authResult = validateAuth(authHeader);

    const authError = requireAuthOrAllow(authResult);
    if (authError) return authError;

    return HttpResponse.json(patientsStore.findById(params.id as string));
  }),
  // PUT api call to update patient
  http.put("/api/patients/:id", async ({ request, params }) => {
    
    const authHeader = request.headers.get("Authorization") || "";
    const authResult = validateAuth(authHeader);

    const authError = requireAuth(authResult);
    if (authError) {
      return authError;
    }

    const patientIndex = patientsStore.findIndexById(params.id as string);
    
    if (patientIndex === -1) {
      return HttpResponse.json({ message: "Patient not found" }, { status: 404 });
    }
    
    const updateData = await request.json() as Partial<Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>>;
    const currentPatient = patientsStore.getAll()[patientIndex];
    
    const updatedPatient: Patient = {
      ...currentPatient,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    
    patientsStore.update(patientIndex, updatedPatient);
    
    await delay(300);
    return HttpResponse.json(updatedPatient);
  }),
  http.post("/api/patients", async ({ request }) => {
    const authHeader = request.headers.get("Authorization") || "";
    const authResult = validateAuth(authHeader);

    const authError = requireAuth(authResult);
    if (authError) return authError;

    const patientData = await request.json() as Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;
    const newId = Math.max(...patientsStore.getAll().map((p: Patient) => p.id)) + 1;
    const now = new Date().toISOString();
    
    const newPatient: Patient = {
      id: newId,
      ...patientData,
      createdAt: now,
      updatedAt: now,
    };
    
    patientsStore.add(newPatient);
    
    await delay(300);
    return HttpResponse.json(newPatient, { status: 201 });
  }),
  http.delete("/api/patients/:id", async ({ request, params }) => {
    const authHeader = request.headers.get("Authorization") || "";
    const authResult = validateAuth(authHeader);

    const authError = requireAuth(authResult);
    if (authError) return authError;

    const patientIndex = patientsStore.findIndexById(params.id as string);
    
    if (patientIndex === -1) {
      return HttpResponse.json({ message: "Patient not found" }, { status: 404 });
    }
    
    const deletedPatient = patientsStore.remove(patientIndex);
    
    await delay(300);
    return HttpResponse.json({ message: "Patient deleted successfully", patient: deletedPatient });
  }),
  http.post("/api/logout", async ({ request }) => {
    const authHeader = request.headers.get("Authorization") || "";
    
    if (authHeader) {
      // Extract token from "Bearer <token>" format
      const token = authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : authHeader;
        
      if (getAuthToken(token)) {
        removeAuthToken(token);
      }
    }
    
    await delay(200);
    return HttpResponse.json({ message: "Logout successful" });
  }),
];

export { handlers };