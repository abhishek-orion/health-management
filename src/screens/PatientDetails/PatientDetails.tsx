import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Clock, Edit } from 'lucide-react';
import { usePatientDetails } from '@/hooks/usePatientDetails';
import { Text } from '@/components/ui/Typography/Text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar/avatar';
import { Button } from '@/components/ui/Button/button';
import { AddEditPatientModal } from '@/components/AddEditPatientModal';
import Header from '@/components/Header/Header';
import { useAuth } from '@/contexts/AuthContext/AuthContext';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { patient, loading, error, refetch } = usePatientDetails(id || '');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    // Refresh patient details after successful edit
    if (refetch) {
      refetch();
    }
  };

  if (loading) {
    return (
      <div className="patient-details-container">
        <div className="patient-details-loading">
          <div className="loading-spinner"></div>
          <Text type="h6">Loading patient details...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-details-container">
        <div className="patient-details-header">
          <Button
            variant="outline"
            onClick={handleBack}
            className="back-button"
          >
            <ArrowLeft size={20} />
            <span>Back to Patients</span>
          </Button>
        </div>
        <div className="patient-details-error">
          <Text type="h6">Error: {error}</Text>
          <Button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="patient-details-container">
        <div className="patient-details-header">
          <Button
            variant="outline"
            onClick={handleBack}
            className="back-button"
          >
            <ArrowLeft size={20} />
            <span>Back to Patients</span>
          </Button>
        </div>
        <div className="patient-details-error">
          <Text type="h6">Patient not found</Text>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column", 
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      backgroundColor: "var(--background)",
      border: "var(--border-thin) solid var(--sidebar-border)",
    }}>
      <Header title={patient ? `Patient Details - ${patient.name}` : 'Patient Details'} />
      <div style={{
        display: "flex",
        flexDirection: "column",
        margin: "var(--space-xs)",
        marginTop: 0,
        flex: 1,
        backgroundColor: "var(--card)",
        borderRadius: "var(--radius-lg)",
        minHeight: 0,
        width: "-webkit-fill-available",
        padding: "var(--space-lg)",
        overflow: "auto"
      }}>
        <div className="patient-details-header">
        <Button
          variant="outline"
          onClick={handleBack}
          className="back-button"
        >
          <ArrowLeft size={20} />
          <Text type="span">Back to Patients</Text>
        </Button>
        {isAdmin && (
          <Button
            variant="primary"
            onClick={handleEdit}
            className="edit-button"
            style={{ backgroundColor: "var(--primary-400)" }}
          >
            <Edit size={18} />
            <Text type="span">Edit Patient</Text>
          </Button>
        )}
      </div>

      {/* Patient Profile Card */}
      <div className="patient-profile-card">
        <div className="profile-avatar-section">
          <Avatar className="profile-avatar">
            <AvatarImage 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} 
              alt={patient.name} 
            />
            <AvatarFallback className="profile-avatar-fallback">
              {getInitials(patient.name)}
            </AvatarFallback>
          </Avatar>
          <div className="profile-info">
            <Text type="h4" className="profile-name">{patient.name}</Text>
            <Text type="p" className="profile-id">Patient ID: #{patient.id}</Text>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="patient-details-grid">
        {/* Basic Information */}
        <div className="details-card">
          <div className="details-card-header">
            <User size={20} />
            <Text type="h6">Basic Information</Text>
          </div>
          <div className="details-card-content">
            <div className="detail-row">
              <Text type="span" className="detail-label">Full Name</Text>
              <Text type="span" className="detail-value">{patient.name}</Text>
            </div>
            <div className="detail-row">
              <Text type="span" className="detail-label">Gender</Text>
              <Text type="span" className="detail-value">{patient.gender}</Text>
            </div>
            <div className="detail-row">
              <Text type="span" className="detail-label">Date of Birth</Text>
              <Text type="span" className="detail-value">{formatDate(patient.dob)}</Text>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="details-card">
          <div className="details-card-header">
            <Mail size={20} />
            <Text type="h6">Contact Information</Text>
          </div>
          <div className="details-card-content">
            <div className="detail-row">
              <Text type="span" className="detail-label">Email</Text>
              <Text type="span" className="detail-value">{patient.email}</Text>
            </div>
            <div className="detail-row">
              <Text type="span" className="detail-label">Phone</Text>
              <Text type="span" className="detail-value">{patient.phone}</Text>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="details-card">
          <div className="details-card-header">
            <Clock size={20} />
            <Text type="h6">System Information</Text>
          </div>
          <div className="details-card-content">
            <div className="detail-row">
              <Text type="span" className="detail-label">Created</Text>
              <Text type="span" className="detail-value">{formatDateTime(patient.createdAt)}</Text>
            </div>
            <div className="detail-row">
              <Text type="span" className="detail-label">Last Updated</Text>
              <Text type="span" className="detail-value">{formatDateTime(patient.updatedAt)}</Text>
            </div>
          </div>
        </div>
      </div>

        {/* Edit Patient Modal */}
        <AddEditPatientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            setIsEditModalOpen(false);
            window.location.reload();
          }}
          patient={patient}
        />
      </div>
    </div>
  );
};

export default PatientDetails;