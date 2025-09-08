import { useState, useEffect } from 'react';
import patientService from '@/services/patientService';
import { Patient } from '@/contexts/PatientContext/PatientContext.d';

export const usePatientDetails = (patientId: string) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) {
        setError('Patient ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const patientData = await patientService.getPatientById(patientId);
        setPatient(patientData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch patient details');
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  const refetch = () => {
    if (patientId) {
      setLoading(true);
      setError(null);
      patientService.getPatientById(patientId)
        .then(setPatient)
        .catch((err) => setError(err instanceof Error ? err.message : 'Failed to fetch patient details'))
        .finally(() => setLoading(false));
    }
  };

  return {
    patient,
    loading,
    error,
    refetch,
  };
};