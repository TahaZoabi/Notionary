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
import { useForm } from "react-hook-form";

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit() {}
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
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
              placeholder={"******"}
              {...register("password", { required: "Password is required" })}
            />
            <CardDescription className={"text-destructive text-sm mb-2"}>
              {typeof errors.password?.message === "string"
                ? errors.password?.message
                : null}
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