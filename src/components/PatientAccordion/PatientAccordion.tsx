import React from "react";
import { Accordion } from "@/components/ui/Accordion/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar/avatar";
import { Text } from "@/components/ui/Typography/Text";
import { Button } from "@/components/ui/Button/button";
import { Edit, Trash2, Eye, Mail, Phone, Calendar, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { Patient } from "@/contexts/PatientContext/PatientContext.d";
interface PatientAccordionProps {
  patients: Patient[];
  onView: (patientId: number) => void;
  onEdit: (patientId: number) => void;
  onDelete: (patientId: number) => void;
}

const PatientAccordion: React.FC<PatientAccordionProps> = ({
  patients,
  onView,
  onEdit,
  onDelete,
}) => {
  const { isAdmin } = useAuth();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const accordionItems = patients.map((patient) => ({
    id: patient.id.toString(),
    header: (
      <div className="flex items-center w-full" style={{gap: 'var(--space-sm)'}}>
        <Avatar className="flex-shrink-0" style={{height: 'var(--space-xl)', width: 'var(--space-xl)', borderRadius: 'var(--radius-md)'}}>
          <AvatarImage 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} 
            alt={patient.name} 
          />
          <AvatarFallback 
            className="text-sm font-medium" 
            style={{backgroundColor: 'var(--primary-100)', color: 'var(--primary-600)', borderRadius: 'var(--radius-md)'}}
          >
            {getInitials(patient.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <Text type="h6" className="font-semibold truncate" style={{color: 'var(--neutral-900)'}}>{patient.name}</Text>
          <Text type="span" className="text-sm truncate" style={{color: 'var(--neutral-500)'}}>
            ID: #{patient.id} • {patient.gender}
          </Text>
        </div>
        <div className="flex-shrink-0">
          <Text type="span" className="text-xs" style={{color: 'var(--neutral-500)'}}>
            {formatDate(patient.createdAt)}
          </Text>
        </div>
      </div>
    ),
    content: (
      <div style={{gap: 'var(--space-lg)'}} className="space-y-4">
        {/* Patient Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{gap: 'var(--space-lg)'}}>
          <div className="flex items-center" style={{gap: 'var(--space-xs)'}}>
            <Mail size={16} style={{color: 'var(--neutral-400)'}} />
            <div>
              <Text type="span" className="text-xs block" style={{color: 'var(--neutral-500)'}}>Email</Text>
              <Text type="p" className="text-sm" style={{color: 'var(--neutral-900)'}}>{patient.email}</Text>
            </div>
          </div>
          <div className="flex items-center" style={{gap: 'var(--space-xs)'}}>
            <Phone size={16} style={{color: 'var(--neutral-400)'}} />
            <div>
              <Text type="span" className="text-xs block" style={{color: 'var(--neutral-500)'}}>Phone</Text>
              <Text type="p" className="text-sm" style={{color: 'var(--neutral-900)'}}>{patient.phone}</Text>
            </div>
          </div>
          <div className="flex items-center" style={{gap: 'var(--space-xs)'}}>
            <Calendar size={16} style={{color: 'var(--neutral-400)'}} />
            <div>
              <Text type="span" className="text-xs block" style={{color: 'var(--neutral-500)'}}>Date of Birth</Text>
              <Text type="p" className="text-sm" style={{color: 'var(--neutral-900)'}}>{formatDate(patient.dob)}</Text>
            </div>
          </div>
          <div className="flex items-center" style={{gap: 'var(--space-xs)'}}>
            <User size={16} style={{color: 'var(--neutral-400)'}} />
            <div>
              <Text type="span" className="text-xs block" style={{color: 'var(--neutral-500)'}}>Gender</Text>
              <Text type="p" className="text-sm" style={{color: 'var(--neutral-900)'}}>{patient.gender}</Text>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap pt-2 border-t" style={{gap: 'var(--space-xs)', borderColor: 'var(--neutral-200)'}}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(patient.id)}
            className="flex items-center" 
            style={{gap: 'var(--space-2xs)', boxShadow: 'var(--elevation-floating)', borderRadius: 'var(--radius-md)'}}
          >
            <Eye size={14} />
            <span>View</span>
          </Button>
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(patient.id)}
              className="flex items-center" 
              style={{gap: 'var(--space-2xs)', boxShadow: 'var(--elevation-floating)', borderRadius: 'var(--radius-md)'}}
            >
              <Edit size={14} />
              <span>Edit</span>
            </Button>
          )}
          {isAdmin && (
            <Button
              variant="error"
              size="sm"
              onClick={() => onDelete(patient.id)}
              className="flex items-center" 
              style={{gap: 'var(--space-2xs)', boxShadow: 'var(--elevation-floating)', borderRadius: 'var(--radius-md)'}}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </Button>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <div style={{gap: 'var(--space-xs)'}} className="space-y-2">
      <Accordion items={accordionItems} allowMultiple={true} />
    </div>
  );
};

export default PatientAccordion;