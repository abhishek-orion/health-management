import { useEffect } from "react";
import { usePatient } from "@/contexts/PatientContext/PatientContext";
import { PatientsTable } from "@/components/LazyComponents";

const PatientsTabContent = () => {
  const { patients, pagination, loading, error, getPatients } = usePatient();

  useEffect(() => {
    getPatients({ page: 1, limit: 10 });
  }, []);

  return (
    <PatientsTable 
      patients={patients} 
      pagination={pagination}
      loading={loading} 
      error={error} 
      onPaginationChange={getPatients}
    />
  );
};

export default PatientsTabContent;
