import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className={"flex justify-center items-center flex-col gap-5"}>
      <h3 className={"text-destructive text-4xl"}>404</h3>
      <h3 className={"text-lg"}>Page Not Found!</h3>
      <Link to={"/"}>
        {" "}
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
