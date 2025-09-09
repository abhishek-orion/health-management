import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Patient } from "@/contexts/PatientContext/PatientContext.d";
import { debounce } from "@/utils/commonUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination/pagination";
import { Text } from "@/components/ui/Typography/Text";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Avatar/avatar";
import SearchableTableHead from "@/components/SearchableTableHead/SearchableTableHead";
import PatientActionButtons from "@/components/PatientActionButtons/PatientActionButtons";
import SortableTableHead from "@/components/SortableTableHead/SortableTableHead";
import { AddEditPatientModal, PatientAccordion } from "@/components/LazyComponents";
import PatientAccordionSkeleton from "@/components/PatientAccordionSkeleton/PatientAccordionSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog/DeleteConfirmationDialog";
import PatientsTableStickyHeader from "@/components/PatientsTableStickyHeader/PatientsTableStickyHeader";
import MobilePagination from "@/components/MobilePagination/MobilePagination";
import GlobalSearch from "@/components/GlobalSearch/GlobalSearch";
import patientService from "@/services/patientService";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { PatientsTableProps, SortField, SortDirection } from "./PatientsTable.d";
import { ErrorDisplay } from '@/components/ErrorStates';

const PatientsTable = ({
  patients,
  pagination,
  loading,
  error,
  onPaginationChange,
}: PatientsTableProps) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchFilters, setSearchFilters] = useState<Record<SortField, string>>(
    {
      id: "",
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      createdAt: "",
      updatedAt: "",
    }
  );

  // Current search term for backend
  const [currentSearch, setCurrentSearch] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [focusedField, setFocusedField] = useState<SortField | null>(null);
  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkScreenSize = useCallback(() => {
    setIsMobileView(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, []);

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (pagination) {
        setCurrentSearch(searchTerm);
        onPaginationChange({
          page: 1, // Reset to first page when searching
          limit: pagination.limit,
          search: searchTerm || undefined,
          sortBy: sortField || undefined,
          sortOrder: sortDirection || undefined,
        });
      }
    }, 500),
    [pagination, onPaginationChange, sortField, sortDirection]
  );

  // Global search handler for mobile
  const handleGlobalSearchChange = useCallback(
    (value: string) => {
      setGlobalSearch(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleAddPatient = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedPatient(null);
  }, []);


  const handleInputFocus = useCallback((field: SortField) => {
    setFocusedField(field);
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
    }
  }, []);

  const handleInputBlur = useCallback(() => {
    focusTimeoutRef.current = setTimeout(() => {
      setFocusedField(null);
    }, 100);
  }, []);

  useEffect(() => {
    if (focusedField && !loading) {
      const inputElement = document.querySelector(`input[data-field="${focusedField}"]`) as HTMLInputElement;
      if (inputElement) {
        setTimeout(() => {
          inputElement.focus();
        }, 0);
      }
    }
  }, [focusedField, loading, patients.length]);

  const handleSearchChange = useCallback(
    (field: SortField, value: string) => {
      setSearchFilters((prev) => ({ ...prev, [field]: value }));

      const updatedFilters = { ...searchFilters, [field]: value };
      const searchTerms = Object.entries(updatedFilters)
        .filter(([, val]) => val.trim() !== "")
        .map(([, val]) => val.trim());

      const combinedSearch = searchTerms.join(" ");
      debouncedSearch(combinedSearch);
    },
    [searchFilters, debouncedSearch]
  );

  const handlePageChange = useCallback((page: number) => {
    if (pagination) {
      onPaginationChange({
        page,
        limit: pagination.limit,
        search: currentSearch || undefined,
        sortBy: sortField || undefined,
        sortOrder: sortDirection || undefined,
      });
    }
  }, [pagination, currentSearch, sortField, sortDirection, onPaginationChange]);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  }, []);

  const getInitials = useCallback((name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, []);

  const handleSort = useCallback((field: SortField) => {
    let newDirection: SortDirection;

    if (sortField === field) {
      newDirection =
        sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
          ? null
          : "asc";
    } else {
      newDirection = "asc";
    }

    setSortField(newDirection ? field : null);
    setSortDirection(newDirection);

    if (pagination) {
      onPaginationChange({
        page: 1,
        limit: pagination.limit,
        search: currentSearch || undefined,
        sortBy: newDirection ? field : undefined,
        sortOrder: newDirection || undefined,
      });
    }
  }, [sortField, sortDirection, pagination, currentSearch, onPaginationChange]);

  const handleViewPatient = useCallback((patientId: number) => {
    navigate(`/patient/${patientId}`);
  }, [navigate]);

  const handleEdit = useCallback((patientId: number) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setIsEditModalOpen(true);
    }
  }, [patients]);

  const handleDelete = useCallback((patientId: number) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setPatientToDelete(patient);
      setIsDeleteDialogOpen(true);
    }
  }, [patients]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!patientToDelete) return;

    try {
      setIsDeleting(true);
      await patientService.deletePatient(patientToDelete.id.toString());

      if (pagination) {
        onPaginationChange({
          page: pagination.page,
          limit: pagination.limit,
          search: currentSearch || undefined,
          sortBy: sortField || undefined,
          sortOrder: sortDirection || undefined,
        });
      }

      setIsDeleteDialogOpen(false);
      setPatientToDelete(null);
    } catch (error) {
      console.error("Error deleting patient:", error);
      // Error is already handled by deleteErrorHandler
    } finally {
      setIsDeleting(false);
    }
  }, [patientToDelete, pagination, currentSearch, sortField, sortDirection, onPaginationChange]);

  const handleDeleteCancel = useCallback(() => {
    if (!isDeleting) {
      setIsDeleteDialogOpen(false);
      setPatientToDelete(null);
    }
  }, [isDeleting]);

  const handleAddSuccess = useCallback(() => {
    if (pagination) {
      onPaginationChange({
        page: pagination.page,
        limit: pagination.limit,
        search: currentSearch || undefined,
        sortBy: sortField || undefined,
        sortOrder: sortDirection || undefined,
      });
    }
  }, [pagination, currentSearch, sortField, sortDirection, onPaginationChange]);

  const handleEditSuccess = useCallback(() => {
    if (pagination) {
      onPaginationChange({
        page: pagination.page,
        limit: pagination.limit,
        search: currentSearch || undefined,
        sortBy: sortField || undefined,
        sortOrder: sortDirection || undefined,
      });
    } else {
      console.log('PatientsTable: No pagination object available');
    }
  }, [pagination, currentSearch, sortField, sortDirection, onPaginationChange]);

  const loadingContainerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-lg)",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
  };

  const emptyTableStyle = {
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    overflow: "auto" as const,
  };

  const tableStyle = {
    width: "100%",
    minWidth: "800px",
    borderCollapse: "separate" as const,
    borderSpacing: "0 var(--space-xs)",
    backgroundColor: "var(--card)",
  };

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <PatientsTableStickyHeader
          totalPatients={0}
          isMobileView={isMobileView}
          isAdmin={isAdmin}
          onAddPatient={handleAddPatient}
        >
          {isMobileView && (
            <MobilePagination
              pagination={{ page: 1, totalPages: 1, total: 0, limit: 10 }}
              onPageChange={() => {}}
            />
          )}
          
          {isMobileView && (
            <GlobalSearch
              value={globalSearch}
              onChange={handleGlobalSearchChange}
              placeholder="Search patients..."
            />
          )}
        </PatientsTableStickyHeader>
        
        <div style={{ paddingBottom: isMobileView ? "var(--space-lg)" : "0" }}>
          {isMobileView ? (
            <PatientAccordionSkeleton itemCount={5} />
          ) : (
            <div style={emptyTableStyle}>
              <Table style={tableStyle}>
                <TableHeader>
                  <TableRow>
                    <SortableTableHead
                      field="id"
                      onSort={handleSort}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      style={{ minWidth: "60px" }}
                    >
                      <Text type="h6">ID</Text>
                    </SortableTableHead>
                    <SortableTableHead
                      field="name"
                      onSort={handleSort}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      style={{ minWidth: "160px" }}
                    >
                      <Text type="h6">Name</Text>
                    </SortableTableHead>
                    <SortableTableHead
                      field="email"
                      onSort={handleSort}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      style={{ minWidth: "200px" }}
                    >
                      <Text type="h6">Email</Text>
                    </SortableTableHead>
                    <SortableTableHead
                      field="phone"
                      onSort={handleSort}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      style={{ minWidth: "120px" }}
                    >
                      <Text type="h6">Phone</Text>
                    </SortableTableHead>
                    <SortableTableHead
                      field="dob"
                      onSort={handleSort}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      style={{ minWidth: "120px" }}
                    >
                      <Text type="h6">Date of Birth</Text>
                    </SortableTableHead>
                    <SortableTableHead
                      field="gender"
                      onSort={handleSort}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      style={{ minWidth: "80px" }}
                    >
                      <Text type="h6">Gender</Text>
                    </SortableTableHead>
                    <SortableTableHead
                      field="createdAt"
                      onSort={handleSort}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      style={{ minWidth: "100px" }}
                    >
                      <Text type="h6">Created</Text>
                    </SortableTableHead>
                    <SortableTableHead
                      field="updatedAt"
                      onSort={handleSort}
                      sortField={sortField}
                      sortDirection={sortDirection}
                      style={{ minWidth: "100px" }}
                    >
                      <Text type="h6">Last Updated</Text>
                    </SortableTableHead>
                    {isAdmin && (
                      <TableHead style={{ minWidth: "80px" }}>
                        <Text type="h6">Actions</Text>
                      </TableHead>
                    )}
                  </TableRow>
                  <TableRow>
                    <SearchableTableHead
                      placeholder="Search ID"
                      value={searchFilters.id}
                      field="id"
                      onSearchChange={handleSearchChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <SearchableTableHead
                      placeholder="Search name"
                      value={searchFilters.name}
                      field="name"
                      onSearchChange={handleSearchChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <SearchableTableHead
                      placeholder="Search email"
                      value={searchFilters.email}
                      field="email"
                      onSearchChange={handleSearchChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <SearchableTableHead
                      placeholder="Search phone"
                      value={searchFilters.phone}
                      field="phone"
                      onSearchChange={handleSearchChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <SearchableTableHead
                      placeholder="Search DOB"
                      value={searchFilters.dob}
                      field="dob"
                      onSearchChange={handleSearchChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <SearchableTableHead
                      placeholder="Search gender"
                      value={searchFilters.gender}
                      field="gender"
                      onSearchChange={handleSearchChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <SearchableTableHead
                      placeholder="Search created"
                      value={searchFilters.createdAt}
                      field="createdAt"
                      onSearchChange={handleSearchChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <SearchableTableHead
                      placeholder="Search updated"
                      value={searchFilters.updatedAt}
                      field="updatedAt"
                      onSearchChange={handleSearchChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    {isAdmin && (
                      <TableHead style={{ background: "var(--background)" }}>
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 10 }).map((_, index) => (
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
                      {isAdmin && (
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
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "256px",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <ErrorDisplay
          error={{
            status: 0,
            message: error,
            type: 'network',
            timestamp: new Date(),
            retryable: true
          }}
          onRetry={() => {
            if (pagination) {
              onPaginationChange({
                page: pagination.page,
                limit: pagination.limit,
              });
            }
          }}
          size="md"
          context="patients list"
          showRetryButton={true}
        />
      </div>
    );
  }

  const emptyRowStyle = {
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    height: "64px",
  };

  const emptyCellStyle = {
    paddingTop: "var(--space-3xl)",
    paddingBottom: "var(--space-3xl)",
    textAlign: "center" as const,
  };

  if (patients.length === 0) {
    return (
      <div style={loadingContainerStyle}>
        <PatientsTableStickyHeader
          totalPatients={pagination?.total || 0}
          isMobileView={isMobileView}
          isAdmin={isAdmin}
          onAddPatient={handleAddPatient}
        >
          {isMobileView && (
            <MobilePagination
              pagination={pagination || { page: 1, totalPages: 1, total: 0, limit: 10 }}
              onPageChange={handlePageChange}
            />
          )}
        </PatientsTableStickyHeader>

        <div style={emptyTableStyle}>
          <Table style={tableStyle}>
            <TableHeader>
              <TableRow>
                <SortableTableHead
                  field="id"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "60px" }}
                >
                  <Text type="p">ID</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="name"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "160px" }}
                >
                  <Text type="p">Name</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="email"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "200px" }}
                >
                  <Text type="p">Email</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="phone"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "120px" }}
                >
                  <Text type="h6">Phone</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="dob"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "120px" }}
                >
                  <Text type="h6">Date of Birth</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="gender"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "80px" }}
                >
                  <Text type="h6">Gender</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="createdAt"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "100px" }}
                >
                  <Text type="h6">Created</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="updatedAt"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "80px" }}
                >
                  <Text type="h6">Last Updated</Text>
                </SortableTableHead>
                {isAdmin && (
                  <TableHead style={{ minWidth: "80px" }}>
                    <Text type="h6">Actions</Text>
                  </TableHead>
                )}
              </TableRow>
              <TableRow>
                <SearchableTableHead
                  placeholder="Search ID"
                  value={searchFilters.id}
                  field="id"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search name"
                  value={searchFilters.name}
                  field="name"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search email"
                  value={searchFilters.email}
                  field="email"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search phone"
                  value={searchFilters.phone}
                  field="phone"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search DOB"
                  value={searchFilters.dob}
                  field="dob"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search gender"
                  value={searchFilters.gender}
                  field="gender"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search created"
                  value={searchFilters.createdAt}
                  field="createdAt"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow style={emptyRowStyle}>
                <TableCell
                  colSpan={8}
                  style={emptyCellStyle}
                >
                  <Text type="h6" style={{ color: "var(--muted-foreground)" }}>
                    No patients found
                  </Text>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-lg)",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
  };

  const contentContainerStyle = {
    paddingBottom: isMobileView ? "var(--space-lg)" : "0",
  };

  return (
    <div style={containerStyle}>
      <PatientsTableStickyHeader
        totalPatients={pagination?.total || patients.length}
        isMobileView={isMobileView}
        isAdmin={isAdmin}
        onAddPatient={handleAddPatient}
      >
        {isMobileView && pagination && pagination.totalPages > 1 && (
          <MobilePagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
        
        {isMobileView && (
          <GlobalSearch
            value={globalSearch}
            onChange={handleGlobalSearchChange}
            placeholder="Search patients..."
          />
        )}
      </PatientsTableStickyHeader>

      <div style={contentContainerStyle}>
        {isMobileView ? (
          <PatientAccordion
            patients={patients}
            onView={handleViewPatient}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div style={emptyTableStyle}>
            <Table style={tableStyle}>
            <TableHeader>
              <TableRow>
                <SortableTableHead
                  field="id"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "60px" }}
                >
                  <Text type="h6">ID</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="name"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "160px" }}
                >
                  <Text type="h6">Name</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="email"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "200px" }}
                >
                  <Text type="h6">Email</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="phone"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "120px" }}
                >
                  <Text type="h6">Phone</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="dob"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "120px" }}
                >
                  <Text type="h6">Date of Birth</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="gender"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "80px" }}
                >
                  <Text type="h6">Gender</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="createdAt"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "100px" }}
                >
                  <Text type="h6">Created</Text>
                </SortableTableHead>
                <SortableTableHead
                  field="updatedAt"
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  style={{ minWidth: "100px" }}
                >
                  <Text type="h6">Last Updated</Text>
                </SortableTableHead>
                {isAdmin && (
                  <TableHead style={{ minWidth: "80px" }}>
                    <Text type="h6">Actions</Text>
                  </TableHead>
                )}
              </TableRow>
              <TableRow>
                <SearchableTableHead
                  placeholder="Search ID"
                  value={searchFilters.id}
                  field="id"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search name"
                  value={searchFilters.name}
                  field="name"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search email"
                  value={searchFilters.email}
                  field="email"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search phone"
                  value={searchFilters.phone}
                  field="phone"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search DOB"
                  value={searchFilters.dob}
                  field="dob"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search gender"
                  value={searchFilters.gender}
                  field="gender"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search created"
                  value={searchFilters.createdAt}
                  field="createdAt"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <SearchableTableHead
                  placeholder="Search updated"
                  value={searchFilters.updatedAt}
                  field="updatedAt"
                  onSearchChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                {isAdmin && (
                  <TableHead style={{ background: "var(--background)" }}>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.length === 0 ? (
                <TableRow style={emptyRowStyle}>
                  <TableCell
                    colSpan={8}
                    style={emptyCellStyle}
                  >
                    <Text
                      type="h6"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {currentSearch
                        ? "No patients found matching your search"
                        : "No patients found"}
                    </Text>
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => {
                  const rowStyle = {
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    height: "64px",
                    cursor: "pointer",
                  };

                  const cellStyle = {
                    padding: "var(--space-md)",
                  };

                  const nameContainerStyle = {
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                  };

                  const avatarFallbackStyle = {
                    backgroundColor: "var(--primary-100)",
                    color: "var(--primary-600)",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  };

                  const handleRowClick = () => handleViewPatient(patient.id);
                  const handleActionClick = (e: React.MouseEvent) => e.stopPropagation();

                  return (
                    <TableRow
                      key={patient.id}
                      className="group"
                      style={rowStyle}
                      onClick={handleRowClick}
                    >
                      <TableCell
                        style={{ ...cellStyle, minWidth: "60px", fontWeight: "500" }}
                      >
                        <Text type="p">{patient.id}</Text>
                      </TableCell>
                      <TableCell
                        style={{ ...cellStyle, minWidth: "160px" }}
                      >
                        <div style={nameContainerStyle}>
                          <Avatar style={{ height: "32px", width: "32px", flexShrink: 0 }}>
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`}
                              alt={patient.name}
                            />
                            <AvatarFallback style={avatarFallbackStyle}>
                              {getInitials(patient.name)}
                            </AvatarFallback>
                          </Avatar>
                          <Text type="p" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                            {patient.name}
                          </Text>
                        </div>
                      </TableCell>
                      <TableCell style={{ ...cellStyle, minWidth: "200px" }}>
                        <Text type="p" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                          {patient.email}
                        </Text>
                      </TableCell>
                      <TableCell style={{ ...cellStyle, minWidth: "120px" }}>
                        <Text type="p">{patient.phone}</Text>
                      </TableCell>
                      <TableCell style={{ ...cellStyle, minWidth: "120px" }}>
                        <Text type="p">{formatDate(patient.dob)}</Text>
                      </TableCell>
                      <TableCell style={{ ...cellStyle, minWidth: "80px" }}>
                        <Text type="p">{patient.gender}</Text>
                      </TableCell>
                      <TableCell style={{ ...cellStyle, minWidth: "100px" }}>
                        <Text type="p">{formatDate(patient.createdAt)}</Text>
                      </TableCell>
                      <TableCell style={{ ...cellStyle, minWidth: "100px" }}>
                        <Text type="p">{formatDate(patient.updatedAt)}</Text>
                      </TableCell>
                      {isAdmin && (
                        <TableCell
                          style={{ ...cellStyle, minWidth: "80px" }}
                          onClick={handleActionClick}
                        >
                          <PatientActionButtons
                            patientId={patient.id}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            </Table>
          </div>
        )}

        {!isMobileView && pagination && pagination.totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "var(--card)",
              padding: "var(--space-md)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
            }}
          >
            <Text
              type="span"
              style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}
            >
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} patients
            </Text>

            <Pagination style={{ justifyContent: "flex-end" }}>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(pagination.page - 1, 1))
                    }
                    style={{
                      ...(pagination.page === 1 && {
                        pointerEvents: "none",
                        opacity: 0.5,
                      }),
                      cursor: pagination.page === 1 ? "default" : "pointer",
                    }}
                  />
                </PaginationItem>

                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={pagination.page === page}
                      style={{ cursor: "pointer" }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(
                        Math.min(pagination.page + 1, pagination.totalPages)
                      )
                    }
                    style={{
                      ...(pagination.page === pagination.totalPages && {
                        pointerEvents: "none",
                        opacity: 0.5,
                      }),
                      cursor: pagination.page === pagination.totalPages ? "default" : "pointer",
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {isMobileView && pagination && (
        <div style={{ textAlign: "center", paddingTop: "var(--space-sm)", paddingBottom: "var(--space-sm)" }}>
          <Text
            type="span"
            style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}
          >
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} patients
          </Text>
        </div>
      )}

      <AddEditPatientModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        patient={null}
        onSuccess={handleAddSuccess}
      />

      <AddEditPatientModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        patient={selectedPatient}
        onSuccess={handleEditSuccess}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        patientName={patientToDelete?.name}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PatientsTable;
