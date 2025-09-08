import { useState } from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/button";
import { Text } from "@/components/ui/Typography/Text";
import { AlertTriangle, Trash2 } from "lucide-react";
import { DeleteConfirmationDialogProps } from "./DeleteConfirmationDialog.d";



export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Patient",
  message,
  patientName,
  isDeleting = false,
}: DeleteConfirmationDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsProcessing(true);
      await onConfirm();
      onClose();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing && !isDeleting) {
      onClose();
    }
  };

  const defaultMessage = patientName
    ? `Are you sure you want to delete the patient "${patientName}"? This action cannot be undone.`
    : "Are you sure you want to delete this patient? This action cannot be undone.";

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="md"
      closeOnOverlayClick={!isProcessing && !isDeleting}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div
              className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
              style={{ backgroundColor: "var(--destructive)/10" }}
            >
              <AlertTriangle
                className="w-6 h-6 text-red-600 dark:text-red-400"
                style={{ color: "var(--destructive)" }}
              />
            </div>
          </div>
          <div className="flex-1">
            <Text type="h6" className="text-foreground mb-2">
              {title}
            </Text>
            <Text type="p" className="text-muted-foreground">
              {message || defaultMessage}
            </Text>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isProcessing || isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="error"
            onClick={handleConfirm}
            disabled={isProcessing || isDeleting}
            className="min-w-[120px]"
          >
            {isProcessing || isDeleting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Deleting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Trash2 size={16} />
                Delete Patient
              </span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
