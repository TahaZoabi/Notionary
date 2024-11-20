import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LogInFormData {
  username: string;
  password: string;
}

function LogIn() {
  const { loginUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<LogInFormData> = async (data) => {
    try {
      await loginUser(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <Card className="w-full max-w-sm mx-auto my-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account.
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
        <form id={"sign-in-form"} onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username", {
                required: "Username is required",
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder={"************"}
              {...register("password", { required: "Password is required" })}
            />
            <CardDescription className={"text-destructive text-sm mb-2"}>
              {typeof errors.password?.message === "string"
                ? errors.password?.message
                : null}
            </CardDescription>
            <CardDescription>
              Dont have ann account ?{" "}
              <Link className={"font-semibold text-md"} to={"/signup"}>
                Signup
              </Link>
            </CardDescription>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          disabled={isSubmitting}
          form={"sign-in-form"}
          type={"submit"}
          className="w-full"
        >
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LogIn;
