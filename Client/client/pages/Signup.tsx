import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { userContext } from "../../context/userProvider";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      score: [
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar,
      ].filter(Boolean).length,
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (passwordValidation.score < 3) {
      newErrors.password = "Password does not meet security requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const context = useContext(userContext);

  const { userSignup } = context || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Creating account:", formData);
      const response:any = await userSignup(
        formData.username,
        formData.email,
        formData.password
      );

      if(response){
      navigate("/login", {
        state: {
          message: "Account created successfully! Please sign in.",
        },
      });
      }
      

    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthText = (): string => {
    if (passwordValidation.score < 2) return "Weak";
    if (passwordValidation.score < 4) return "Medium";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stackit-primary/5 via-background to-stackit-blue/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <p className="text-sm text-muted-foreground">Get started with your free StackIt account</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* General Error Alert */}
            {errors.general && (
              <Alert variant="destructive">
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className={errors.username ? "border-destructive" : ""}
                />
                {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Password strength:</span>
                      <span
                        className={`text-xs font-medium ${
                          passwordValidation.score < 2
                            ? "text-destructive"
                            : passwordValidation.score < 4
                            ? "text-stackit-orange"
                            : "text-stackit-success"
                        }`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <Progress value={(passwordValidation.score / 5) * 100} className="h-2" />
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <Check
                          className={`h-3 w-3 ${
                            passwordValidation.minLength ? "text-stackit-success" : "text-muted-foreground"
                          }`}
                        />
                        <span className={passwordValidation.minLength ? "text-stackit-success" : "text-muted-foreground"}>
                          8+ characters
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Check
                          className={`h-3 w-3 ${
                            passwordValidation.hasUpperCase ? "text-stackit-success" : "text-muted-foreground"
                          }`}
                        />
                        <span className={passwordValidation.hasUpperCase ? "text-stackit-success" : "text-muted-foreground"}>
                          Uppercase
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Check
                          className={`h-3 w-3 ${
                            passwordValidation.hasLowerCase ? "text-stackit-success" : "text-muted-foreground"
                          }`}
                        />
                        <span className={passwordValidation.hasLowerCase ? "text-stackit-success" : "text-muted-foreground"}>
                          Lowercase
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Check
                          className={`h-3 w-3 ${
                            passwordValidation.hasNumbers ? "text-stackit-success" : "text-muted-foreground"
                          }`}
                        />
                        <span className={passwordValidation.hasNumbers ? "text-stackit-success" : "text-muted-foreground"}>
                          Numbers
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Check
                          className={`h-3 w-3 ${
                            passwordValidation.hasSpecialChar ? "text-stackit-success" : "text-muted-foreground"
                          }`}
                        />
                        <span className={passwordValidation.hasSpecialChar ? "text-stackit-success" : "text-muted-foreground"}>
                          Special character
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-stackit-primary hover:bg-stackit-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-stackit-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
