import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const { signupUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      await signupUser(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create a new account</CardTitle>
        <CardDescription>
          Enter your details below to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Show error alert if there is an error message */}
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <form id={"sign-up-form"} onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 2,
                  message: "Username should be 2 characters at least",
                },
              })}
              id="username"
              type="text"
              placeholder="John Doe"
            />
            <CardDescription className={"text-destructive text-sm mb-2"}>
              {typeof errors.username?.message === "string"
                ? errors.username?.message
                : null}
            </CardDescription>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              id="email"
              placeholder="John123@example.com"
            />
            <CardDescription className={"text-destructive text-sm mb-2"}>
              {typeof errors.email?.message === "string"
                ? errors.email?.message
                : null}
            </CardDescription>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder={"*********"}
              {...register("password", { required: "Password is required" })}
            />
            <CardDescription className={"text-destructive text-sm mb-2"}>
              {typeof errors.password?.message === "string"
                ? errors.password?.message
                : null}
            </CardDescription>{" "}
            <CardDescription>
              Already have an account ?{" "}
              <Link className={"font-semibold text-md"} to={"/login"}>
                Login
              </Link>
            </CardDescription>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={isSubmitting}
          form={"sign-up-form"}
          type={"submit"}
        >
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}
