import { Skeleton } from "@/components/ui/Skeleton";

interface PatientAccordionSkeletonProps {
  itemCount?: number;
}

const PatientAccordionSkeleton = ({ itemCount = 5 }: PatientAccordionSkeletonProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-lg)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "var(--space-md)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-md)",
              }}
            >
              <Skeleton
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%"
                }}
              />
              <div>
                <Skeleton style={{ height: "var(--space-md)", width: "140px" }} />
                <div style={{ marginTop: "var(--space-xs)" }}>
                  <Skeleton style={{ height: "var(--space-sm)", width: "180px" }} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "var(--space-xs)" }}>
              <Skeleton style={{ height: "var(--space-lg)", width: "var(--space-lg)" }} />
              <Skeleton style={{ height: "var(--space-lg)", width: "var(--space-lg)" }} />
              <Skeleton style={{ height: "var(--space-lg)", width: "var(--space-lg)" }} />
            </div>
          </div>
          
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-sm)",
            }}
          >
            <div>
              <Skeleton style={{ height: "var(--space-sm)", width: "40px" }} />
              <div style={{ marginTop: "var(--space-2xs)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "100px" }} />
              </div>
            </div>
            <div>
              <Skeleton style={{ height: "var(--space-sm)", width: "60px" }} />
              <div style={{ marginTop: "var(--space-2xs)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "80px" }} />
              </div>
            </div>
            <div>
              <Skeleton style={{ height: "var(--space-sm)", width: "80px" }} />
              <div style={{ marginTop: "var(--space-2xs)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "70px" }} />
              </div>
            </div>
            <div>
              <Skeleton style={{ height: "var(--space-sm)", width: "50px" }} />
              <div style={{ marginTop: "var(--space-2xs)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "90px" }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientAccordionSkeleton;