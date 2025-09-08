import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { mockSidebarOptions } from "@/mocks/sampleData/sidebar-data";

const Dashboard = () => {
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTabletView(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "var(--background)",
        border: "var(--border-thin) solid var(--sidebar-border)",
      }}
    >
      <Header title="All Patients" />
      <div
        id="content"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "var(--space-xs)",
          marginTop: 0,
          flex: 1,
          backgroundColor: "var(--card)",
          borderRadius: "var(--radius-lg)",
          minHeight: 0,
          width: "-webkit-fill-available"
        }}
      >
        <Sidebar options={mockSidebarOptions} defaultValue="patients" isHorizontal={isTabletView} />
      </div>
    </div>
  );
};

export default Dashboard;
