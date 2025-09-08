import { Button } from "@/components/ui/Button/button";
import { Text } from "@/components/ui/Typography/Text";

interface PaginationInfo {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}

interface MobilePaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

const MobilePagination = ({ pagination, onPageChange }: MobilePaginationProps) => {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2xs)",
  };

  const buttonStyle = {
    height: "var(--space-xl)",
    width: "var(--space-xl)",
    padding: "0",
  };

  const textStyle = {
    fontSize: "0.875rem",
    paddingLeft: "var(--space-sm)",
    paddingRight: "var(--space-sm)",
    color: "var(--muted-foreground)",
  };

  const handlePreviousPage = () => {
    onPageChange(Math.max(pagination.page - 1, 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(pagination.page + 1, pagination.totalPages));
  };

  return (
    <div style={containerStyle}>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePreviousPage}
        disabled={pagination.page === 1}
        style={buttonStyle}
      >
        ‹
      </Button>
      <Text type="span" style={textStyle}>
        {pagination.page} / {pagination.totalPages}
      </Text>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNextPage}
        disabled={pagination.page === pagination.totalPages}
        style={buttonStyle}
      >
        ›
      </Button>
    </div>
  );
};

export default MobilePagination;