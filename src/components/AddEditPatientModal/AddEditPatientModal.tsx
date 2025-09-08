import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/Label/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/Form/form";
import { Text } from "@/components/ui/Typography/Text";
import {
  patientFormSchema,
  type PatientFormData,
  createPatientPayload,
  parsePatientForForm,
} from "@/schemas/patientSchema";
import patientService from "@/services/patientService";
import { AddEditPatientModalProps } from "./AddEditPatientModal.d";

export function AddEditPatientModal({
  isOpen,
  onClose,
  patient,
  onSuccess,
}: AddEditPatientModalProps) {
  const isEditing = !!patient;
  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: parsePatientForForm(patient),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = form;

  useEffect(() => {
    if (isOpen) {
      const formData = parsePatientForForm(patient);
      reset(formData);
    }
  }, [isOpen, patient, reset]);

  const onSubmit = async (data: PatientFormData) => {
    try {
      const payload = createPatientPayload(data);
      let result;
      if (isEditing && patient) {
        result = await patientService.updatePatient(
          String(patient.id),
          payload
        );
      } else {
        result = await patientService.createPatient(payload);
      }
      onSuccess();
      onClose();
      reset();
    } catch (error) {
      console.error("EditPatient: Error saving patient:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the patient"
      );
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Patient" : "Add New Patient"}
      size="lg"
    >
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          style={{ gap: "var(--space-lg)" }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "var(--space-md)" }}
          >
            <div className="space-y-2" style={{ gap: "var(--space-xs)" }}>
              <Label htmlFor="firstName">
                First Name{" "}
                <Text type="span" style={{ color: "var(--error)" }}>
                  *
                </Text>
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                aria-invalid={!!errors.firstName}
                {...register("firstName")}
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border-thin)",
                  color: "var(--foreground)",
                  borderWidth: "var(--border-thin)",
                  borderRadius: "var(--radius)",
                }}
              />
              {errors.firstName && (
                <p
                  className="text-sm"
                  style={{ color: "var(--error)" }}
                  role="alert"
                >
                  <Text type="span" style={{ color: "var(--error)" }}>
                    {errors.firstName.message}
                  </Text>
                </p>
              )}
            </div>

            <div className="space-y-2" style={{ gap: "var(--space-xs)" }}>
              <Label htmlFor="lastName">
                Last Name{" "}
                <Text type="span" style={{ color: "var(--error)" }}>
                  *
                </Text>
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter last name"
                aria-invalid={!!errors.lastName}
                {...register("lastName")}
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border-thin)",
                  color: "var(--foreground)",
                  borderWidth: "var(--border-thin)",
                  borderRadius: "var(--radius)",
                }}
              />
              {errors.lastName && (
                <p
                  className="text-sm"
                  style={{ color: "var(--error)" }}
                  role="alert"
                >
                  <Text type="span" style={{ color: "var(--error)" }}>
                    {errors.lastName.message}
                  </Text>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2" style={{ gap: "var(--space-xs)" }}>
            <Label htmlFor="email">
              Email Address{" "}
              <Text type="span" style={{ color: "var(--error)" }}>
                *
              </Text>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              aria-invalid={!!errors.email}
              {...register("email")}
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border-thin)",
                color: "var(--foreground)",
                borderWidth: "var(--border-thin)",
                borderRadius: "var(--radius)",
              }}
            />
            {errors.email && (
              <p
                className="text-sm"
                style={{ color: "var(--error)" }}
                role="alert"
              >
                <Text type="span" style={{ color: "var(--error)" }}>
                  {errors.email.message}
                </Text>
              </p>
            )}
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "var(--space-md)" }}
          >
            <div className="space-y-2" style={{ gap: "var(--space-xs)" }}>
              <Label htmlFor="phone">
                Phone Number{" "}
                <Text type="span" style={{ color: "var(--error)" }}>
                  *
                </Text>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                aria-invalid={!!errors.phone}
                {...register("phone")}
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border-thin)",
                  color: "var(--foreground)",
                  borderWidth: "var(--border-thin)",
                  borderRadius: "var(--radius)",
                }}
              />
              {errors.phone && (
                <p
                  className="text-sm"
                  style={{ color: "var(--error)" }}
                  role="alert"
                >
                  <Text type="span" style={{ color: "var(--error)" }}>
                    {errors.phone.message}
                  </Text>
                </p>
              )}
            </div>

            <div className="space-y-2" style={{ gap: "var(--space-xs)" }}>
              <Label htmlFor="dob">
                Date of Birth{" "}
                <Text type="span" style={{ color: "var(--error)" }}>
                  *
                </Text>
              </Label>
              <Input
                id="dob"
                type="date"
                aria-invalid={!!errors.dob}
                {...register("dob")}
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border-thin)",
                  color: "var(--foreground)",
                  borderWidth: "var(--border-thin)",
                  borderRadius: "var(--radius)",
                }}
              />
              {errors.dob && (
                <div
                  className="text-sm"
                  style={{ color: "var(--error)" }}
                  role="alert"
                >
                  <Text type="span" style={{ color: "var(--error)" }}>
                    {errors.dob.message}
                  </Text>
                </div>
              )}
            </div>
          </div>

          <FormField
            control={control}
            name="gender"
            render={({ field }) => (
              <FormItem
                className="space-y-2"
                style={{ gap: "var(--space-xs)" }}
              >
                <FormLabel htmlFor="gender">
                  Gender{" "}
                  <Text type="span" style={{ color: "var(--error)" }}>
                    *
                  </Text>
                </FormLabel>
                <FormControl>
                  <select
                    id="gender"
                    className="flex h-9 w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-base shadow-xs"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border-thin)",
                      color: "var(--foreground)",
                      borderWidth: "var(--border-thin)",
                      borderRadius: "var(--radius)",
                    }}
                    {...field}
                  >
                    <option
                      value=""
                      style={{
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                      }}
                    >
                      Select gender
                    </option>
                    <option
                      value="Male"
                      style={{
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                      }}
                    >
                      Male
                    </option>
                    <option
                      value="Female"
                      style={{
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                      }}
                    >
                      Female
                    </option>
                    <option
                      value="Other"
                      style={{
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                      }}
                    >
                      Other
                    </option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            className="flex justify-end border-t border-border"
            style={{ gap: "var(--space-sm)", paddingTop: "var(--space-md)" }}
          >
            <Button
              type="button"
              variant="error"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="neutral"
              disabled={isSubmitting}
              style={{ minWidth: "120px" }}
            >
              {isSubmitting ? (
                <Text
                  type="span"
                  className="items-center justify-center gap-2"
                  style={{ display: "flex", height: "-webkit-fill-available" }}
                >
                  {isEditing ? "Updating..." : "Creating..."}
                </Text>
              ) : (
                <Text type="span">
                  {isEditing ? "Update Patient" : "Create Patient"}
                </Text>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}

export default AddEditPatientModal;
