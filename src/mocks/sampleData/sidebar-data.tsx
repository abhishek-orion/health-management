import { SidebarOption } from "@/components/Sidebar/Sidebar";
import { Users, Calendar, FileText } from "lucide-react";
import { Text } from "@/components/ui/Typography/Text";
import PatientsTabContent from "@/components/PatientsTabContent/PatientsTabContent";

export const mockSidebarOptions: SidebarOption[] = [
  {
    value: "patients",
    label: "Patients",
    icon: <Users className="h-4 w-4 mr-2" />,
    content: <PatientsTabContent />,
  },
  {
    value: "appointments",
    label: "Appointments",
    icon: <Calendar className="h-4 w-4 mr-2" />,
    content: (
      <>
        <Text type="h3" className="mb-4">
          Appointments
        </Text>
        <p>Appointments content goes here...</p>
      </>
    ),
  },
  {
    value: "records",
    label: "Records",
    icon: <FileText className="h-4 w-4 mr-2" />,
    content: (
      <>
        <Text type="h3" className="mb-4">
          Medical Records
        </Text>
        <p>Medical records content goes here...</p>
      </>
    ),
  },
];
