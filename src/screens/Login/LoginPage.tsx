import { useState, CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ErrorDisplay } from "@/components/ErrorStates";
import { useTheme } from "@/contexts/ThemeContext/ThemeContext";
import "./login.css";
import Logo from "url:../../../public/logo.jpg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card/card";
import { Text } from "@/components/ui/Typography/Text";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form/form";
import { EyeOff, Eye, Loader2 } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { error, handleError, clearError, setRetryAction } = useErrorHandler();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { theme } = useTheme();

  // Define styles using CSS variables from global.css
  const styles: Record<string, CSSProperties> = {
    pageContainer: {
      height: "100vh",
      width: "100vw",
      padding: "var(--space-md)",
      overflow: "hidden",
    },
    backgroundContainer: {
      height: "100%",
      width: "100%",
      borderRadius: "var(--radius-lg)",
      position: "relative",
    },
    logoContainer: {
      backgroundColor:
        theme === "dark" ? "var(--card)" : "var(--neutral-white)",
    },
    loginContainer: {
      backgroundColor:
        theme === "dark" ? "var(--card)" : "var(--neutral-white)",
    },
    divider: {
      width: "100%",
      height: "1px",
      backgroundColor:
        theme === "dark" ? "var(--border)" : "var(--neutral-200)",
      margin: "var(--space-md) 0",
    },
    formSpacing: {
      marginBottom: "var(--space-md)",
    },
  };

  const form = useForm<LoginFormData>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      setIsSubmitting(true);
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      navigate("/dashboard");
    } catch (err: any) {
      console.log("Login attempt failed:", err?.message || err);
      try {
        handleError(err, "login");
        setRetryAction(() => onSubmit(data));
      } catch (handlerError) {
        console.log(
          "Error handler failed, using fallback:",
          (handlerError as any)?.message || handlerError
        );

        const errorMessage =
          err?.message ||
          err?.toString?.() ||
          "Login failed. Please check your credentials and try again.";

        setTimeout(() => {
          alert(errorMessage);
        }, 100);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.pageContainer}>
      <div
        data-testid="login-page"
        className="login-page-background"
        style={styles.backgroundContainer}
      >
        <div className="logo-container" style={styles.logoContainer}>
          <img src={Logo} alt="Logo" style={{ height: "2.5rem" }} />
        </div>
        <div
          data-testid="login-container"
          className="login-form-container"
          style={styles.loginContainer}
        >
          <Card
            style={{
              border: "none",
              boxShadow: "none",
              backgroundColor:
                theme === "dark" ? "var(--card)" : "var(--neutral-white)",
            }}
          >
            <CardHeader>
              <CardTitle>
                <Text
                  type="h3"
                  color={
                    theme === "dark"
                      ? "var(--foreground)"
                      : "var(--neutral-black)"
                  }
                >
                  Welcome to Health Management
                </Text>
              </CardTitle>
              <CardDescription>
                <Text
                  type="h6"
                  color={
                    theme === "dark"
                      ? "var(--muted-foreground)"
                      : "var(--neutral-500)"
                  }
                >
                  Sign in to your account to continue
                </Text>
              </CardDescription>
            </CardHeader>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
              }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-md)",
                  }}
                >
                  {error && (
                    <ErrorDisplay
                      error={error}
                      onRetry={() => {
                        const formData = form.getValues();
                        onSubmit(formData);
                      }}
                      onClear={clearError}
                      size="sm"
                      context="login"
                      showRetryButton={false}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email address is invalid",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <Text
                          type="h6"
                          color={
                            theme === "dark"
                              ? "var(--foreground)"
                              : "var(--neutral-black)"
                          }
                        >
                          Email
                        </Text>
                        <FormControl>
                          <Input
                            aria-invalid={!!form.formState.errors.email}
                            aria-label="Email"
                            style={{ width: "100%", height: "3rem" }}
                            type="email"
                            placeholder="Email"
                            {...field}
                          />
                        </FormControl>
                        <div className="min-h-[20px]">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    rules={{
                      required: "Password is required",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <Text
                          type="h6"
                          color={
                            theme === "dark"
                              ? "var(--foreground)"
                              : "var(--neutral-black)"
                          }
                        >
                          Password
                        </Text>
                        <FormControl>
                          <Input
                            aria-invalid={!!form.formState.errors.password}
                            aria-label="Password"
                            style={{ width: "100%", height: "3rem" }}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            addon={
                              <Button
                                type="button"
                                style={{
                                  border: "none",
                                  margin: "0 var(--space-xs)",
                                }}
                                variant="outline"
                                size="icon"
                                onClick={onShowPasswordClick}
                                aria-label={
                                  showPassword
                                    ? "Hide password"
                                    : "Show password"
                                }
                              >
                                {showPassword ? (
                                  <EyeOff
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Eye className="h-4 w-4" aria-hidden="true" />
                                )}
                              </Button>
                            }
                            {...field}
                          />
                        </FormControl>
                        <div className="min-h-[20px]">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "var(--space-xs)",
                            }}
                          >
                            <FormControl>
                              <Checkbox
                                aria-label="Remember me"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <Text
                              type="h6"
                              color={
                                theme === "dark"
                                  ? "var(--foreground)"
                                  : "var(--neutral-black)"
                              }
                            >
                              Remember me
                            </Text>
                          </div>
                        </FormItem>
                      )}
                    />
                    <div>
                      <Button type="button" variant="link" size="sm">
                        Forgot password?
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    aria-label="Login"
                    style={{ width: "100%" }}
                    variant="primary"
                    size="lg"
                    disabled={!form.formState.isValid}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </Form>
              <div id="horizontal-divider" style={styles.divider}></div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Text
                  type="h6"
                  color={
                    theme === "dark"
                      ? "var(--foreground)"
                      : "var(--neutral-black)"
                  }
                >
                  Or
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "var(--space-xs)",
                }}
              >
                <Button variant="outline" size="lg">
                  Login with Google
                </Button>
                <Button variant="outline" size="lg">
                  Login with Microsoft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
