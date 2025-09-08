import { Plus } from "lucide-react";
import { Text } from "@/components/ui/Typography/Text";
import { Button } from "@/components/ui/Button/button";

interface PatientsTableStickyHeaderProps {
  totalPatients: number;
  isMobileView: boolean;
  isAdmin: boolean;
  onAddPatient: () => void;
  children?: React.ReactNode;
}

const PatientsTableStickyHeader = ({
  totalPatients,
  isMobileView,
  isAdmin,
  onAddPatient,
  children,
}: PatientsTableStickyHeaderProps) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-lg)",
    padding: "var(--space-lg)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--border)",
    backgroundColor: "var(--background)",
    borderColor: "var(--border)",
    ...(isMobileView && {
      position: "sticky" as const,
      top: "0",
      zIndex: 10,
      backdropFilter: "blur(8px)",
      boxShadow: "var(--elevation-floating)",
    }),
  };

  const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const bottomRowStyle = {
    display: "flex",
    flexDirection: isMobileView ? ("column" as const) : ("row" as const),
    alignItems: "stretch",
    gap: "var(--space-sm)",
  };

  const addButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-sm)",
    backgroundColor: "var(--primary-400)",
    color: "white",
    border: "none",
  };

  return (
    <div style={containerStyle}>
      <div style={topRowStyle}>
        <Text type="h5" style={{ color: "var(--foreground)" }}>
          Patients ({totalPatients})
        </Text>

        {children}

        {!isMobileView && isAdmin && (
          <Button
            onClick={onAddPatient}
            style={addButtonStyle}
          >
            <Plus size={18} />
            <Text type="span">Add Patient</Text>
          </Button>
        )}
      </div>

      {isMobileView && isAdmin && (
        <div style={bottomRowStyle}>
          <Button
            onClick={onAddPatient}
            style={addButtonStyle}
          >
            <Plus size={18} />
            <Text type="span">Add Patient</Text>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientsTableStickyHeader;