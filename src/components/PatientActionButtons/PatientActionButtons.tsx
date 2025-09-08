import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button/button";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

interface PatientActionButtonsProps {
  patientId: number;
  onEdit: (patientId: number) => void;
  onDelete: (patientId: number) => void;
}

const PatientActionButtons = ({ patientId, onEdit, onDelete }: PatientActionButtonsProps) => {
  const { isAdmin } = useAuth();

  const handleEdit = () => {
    onEdit(patientId);
  };

  const handleDelete = () => {
    onDelete(patientId);
  };

  const handleEditMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--primary-50)';
    e.currentTarget.style.color = 'var(--primary-700)';
  };

  const handleEditMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--card)';
    e.currentTarget.style.color = 'var(--foreground)';
  };

  const handleDeleteMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--error-50)';
    e.currentTarget.style.color = 'var(--error-700)';
  };

  const handleDeleteMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--card)';
    e.currentTarget.style.color = 'var(--foreground)';
  };

  return (
    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity" style={{gap: 'var(--space-2xs)'}}>
      {isAdmin && (
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-7 p-0 border-0 shadow-none"
          onClick={handleEdit}
          style={{
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)'
          }}
          onMouseEnter={handleEditMouseEnter}
          onMouseLeave={handleEditMouseLeave}
        >
          <Edit className="h-3 w-3" />
        </Button>
      )}
      {isAdmin && (
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-7 p-0 border-0 shadow-none"
          onClick={handleDelete}
          style={{
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)'
          }}
          onMouseEnter={handleDeleteMouseEnter}
          onMouseLeave={handleDeleteMouseLeave}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default PatientActionButtons;