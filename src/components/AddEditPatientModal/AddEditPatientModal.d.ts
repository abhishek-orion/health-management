import { Patient } from "@/contexts/PatientContext/PatientContext.d";

export interface AddEditPatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    patient?: Patient | null;
    onSuccess: () => void;
  }