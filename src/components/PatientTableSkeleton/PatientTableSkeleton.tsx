import { Skeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/table";

interface PatientTableSkeletonProps {
  rowCount?: number;
}

const PatientTableSkeleton = ({ rowCount = 10 }: PatientTableSkeletonProps) => {
  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <Table
        style={{
          width: "100%",
          minWidth: "800px",
          borderCollapse: "separate",
          borderSpacing: "0 var(--space-xs)",
          backgroundColor: "var(--card)",
        }}
      >
        <TableHeader>
          <TableRow>
            <TableHead style={{ minWidth: "60px" }}>
              <Skeleton style={{ height: "var(--space-lg)" }} />
            </TableHead>
            <TableHead style={{ minWidth: "160px" }}>
              <Skeleton style={{ height: "var(--space-lg)" }} />
            </TableHead>
            <TableHead style={{ minWidth: "200px" }}>
              <Skeleton style={{ height: "var(--space-lg)" }} />
            </TableHead>
            <TableHead style={{ minWidth: "120px" }}>
              <Skeleton style={{ height: "var(--space-lg)" }} />
            </TableHead>
            <TableHead style={{ minWidth: "120px" }}>
              <Skeleton style={{ height: "var(--space-lg)" }} />
            </TableHead>
            <TableHead style={{ minWidth: "80px" }}>
              <Skeleton style={{ height: "var(--space-lg)" }} />
            </TableHead>
            <TableHead style={{ minWidth: "100px" }}>
              <Skeleton style={{ height: "var(--space-lg)" }} />
            </TableHead>
            <TableHead style={{ minWidth: "100px" }}>
              <Skeleton style={{ height: "var(--space-lg)" }} />
            </TableHead>
            <TableHead style={{ minWidth: "80px" }}>
              <Skeleton style={{ height: "var(--space-lg)" }} />
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead>
              <Skeleton style={{ height: "var(--space-xl)" }} />
            </TableHead>
            <TableHead>
              <Skeleton style={{ height: "var(--space-xl)" }} />
            </TableHead>
            <TableHead>
              <Skeleton style={{ height: "var(--space-xl)" }} />
            </TableHead>
            <TableHead>
              <Skeleton style={{ height: "var(--space-xl)" }} />
            </TableHead>
            <TableHead>
              <Skeleton style={{ height: "var(--space-xl)" }} />
            </TableHead>
            <TableHead>
              <Skeleton style={{ height: "var(--space-xl)" }} />
            </TableHead>
            <TableHead>
              <Skeleton style={{ height: "var(--space-xl)" }} />
            </TableHead>
            <TableHead>
              <Skeleton style={{ height: "var(--space-xl)" }} />
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, index) => (
            <TableRow
              key={index}
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                height: "64px",
              }}
            >
              <TableCell style={{ padding: "var(--space-md)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "24px" }} />
              </TableCell>
              <TableCell style={{ padding: "var(--space-md)" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                  }}
                >
                  <Skeleton
                    style={{
                      height: "32px",
                      width: "32px",
                      borderRadius: "50%"
                    }}
                  />
                  <Skeleton style={{ height: "var(--space-md)", width: "120px" }} />
                </div>
              </TableCell>
              <TableCell style={{ padding: "var(--space-md)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "180px" }} />
              </TableCell>
              <TableCell style={{ padding: "var(--space-md)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "100px" }} />
              </TableCell>
              <TableCell style={{ padding: "var(--space-md)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "80px" }} />
              </TableCell>
              <TableCell style={{ padding: "var(--space-md)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "60px" }} />
              </TableCell>
              <TableCell style={{ padding: "var(--space-md)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "80px" }} />
              </TableCell>
              <TableCell style={{ padding: "var(--space-md)" }}>
                <Skeleton style={{ height: "var(--space-md)", width: "80px" }} />
              </TableCell>
              <TableCell style={{ padding: "var(--space-md)" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-xs)",
                  }}
                >
                  <Skeleton style={{ height: "var(--space-lg)", width: "var(--space-lg)" }} />
                  <Skeleton style={{ height: "var(--space-lg)", width: "var(--space-lg)" }} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientTableSkeleton;