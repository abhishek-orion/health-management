import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
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
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      setError("");
      setIsSubmitting(true);
      await login({ email: data.email, password: data.password, rememberMe: data.rememberMe });
      navigate("/dashboard");
      setIsSubmitting(false);
    } catch (err: any) {
      setError(err?.message || "Login failed. Please check your credentials.");
      setIsSubmitting(false);
      console.error(err);
    }
  };

  const onShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen w-screen p-4 overflow-hidden">
      <div
        data-testid="login-page"
        className="login-page-background h-full w-full flex items-center justify-center md:justify-end rounded-lg relative"
      >
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 md:top-8 md:left-8 md:transform-none md:translate-x-0 bg-white/100 p-3 rounded-lg shadow-sm">
          <img src={Logo} alt="Logo" className="h-10 md:h-12" />
        </div>
        <div
          data-testid="login-container"
          className="max-w-md w-full mx-auto mt-32 sm:mt-28 md:mt-0 md:mx-0 md:mr-16 lg:mr-24 p-6 bg-white rounded-lg shadow-md sm:p-4 md:p-6 lg:max-w-lg xl:max-w-xl relative z-10 min-h-[600px] flex flex-col"
        >
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>
                <Text type="h3" color="black">Welcome to Health Management</Text>
              </CardTitle>
              <CardDescription>
                <Text type="h6" color="gray">
                  Sign in to your account to continue
                </Text>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {error && <div className="text-red-500 text-sm">{error}</div>}

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
                        <Text type="h6" color="var(--neutral-black)">Email</Text>
                        <FormControl>
                          <Input
                            aria-invalid={!!form.formState.errors.email}
                            aria-label="Email"
                            className="w-full h-12"
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
                        <Text type="h6" color="var(--neutral-black)">Password</Text>
                        <FormControl>
                          <Input
                            aria-invalid={!!form.formState.errors.password}
                            aria-label="Password"
                            className="w-full h-12"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            addon={
                              <Button
                                type="button"
                                className="border-none mx-2"
                                variant="outline"
                                size="icon"
                                onClick={onShowPasswordClick}
                                aria-label={showPassword ? "Hide password" : "Show password"}
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

                  <div className="flex justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                aria-label="Remember me"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <Text type="h6" color="var(--neutral-black)">Remember me</Text>
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
                    className="w-full"
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
              <div
                id="horizontal-divier"
                className="w-full h-px bg-gray-200 my-4"
              ></div>
              <div className="flex justify-center">
                <Text type="h6" color="var(--neutral-black)">Or</Text>
              </div>
              <div className="flex justify-center flex-col gap-2">
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
