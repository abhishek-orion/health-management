import { z } from "zod";

export const patientFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .refine((value) => /^[A-Za-z\s]+$/.test(value), "First name must contain only letters"),
  
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .refine((value) => /^[A-Za-z\s]+$/.test(value), "Last name must contain only letters"),
  
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .refine((value) => /^[\d\s\-\+\(\)]+$/.test(value), "Please enter a valid phone number"),
  
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), "Please enter a valid date (YYYY-MM-DD)")
    .refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 0 && age - 1 <= 150;
      }
      return age >= 0 && age <= 150;
    }, "Please enter a valid date of birth (age must be between 0 and 150)"),
  
  gender: z
    .string()
    .min(1, "Gender is required")
    .refine((value) => ["Male", "Female", "Other"].includes(value), "Please select a valid gender")
});

export type PatientFormData = z.infer<typeof patientFormSchema>;

export const createPatientPayload = (formData: PatientFormData) => {
  return {
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    phone: formData.phone,
    dob: formData.dob,
    gender: formData.gender,
  };
};

export const parsePatientForForm = (patient?: any): PatientFormData => {
  if (!patient) {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
    };
  }

  // Safely parse the patient name
  const nameParts = patient.name?.split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    firstName,
    lastName,
    email: patient.email || "",
    phone: patient.phone || "",
    dob: patient.dob || "",
    gender: patient.gender || "",
  };
};