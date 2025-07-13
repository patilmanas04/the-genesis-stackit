import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { userContext } from "../../../context/userProvider";
import { FormikInput } from "./FormikInput";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/\d/, "At least one number")
    .matches(
      /[@$!%*?&#^()_+\-=[\]{}|\\,.<>/?]/,
      "At least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const context = useContext(userContext);
  if (!context) throw new Error("userContext must be used within UserProvider");
  const { userSignup } = context;

  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    toast.dismiss();
    try {
      const success = await userSignup(
        values.name,
        values.email,
        values.password
      );
      if (success) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      } else {
        toast.error("Signup failed. Try again.");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-0">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to get started
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <FormikInput
                label="Name"
                name="name"
                type="text"
                placeholder="Your full name"
              />
              <FormikInput
                label="Email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <div className="relative">
                <FormikInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-7 px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <div className="relative">
                <FormikInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-7 px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full bg-stackit-primary hover:bg-stackit-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
