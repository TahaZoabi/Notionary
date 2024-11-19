import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className={
        "flex flex-col sm:flex-row justify-between items-center max-h-screen gap-10 mb-16"
      }
    >
      <div className={"flex flex-col gap-4  p-4"}>
        <h2
          className={
            "text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold"
          }
        >
          Unlock Your Ideas with Notionary
        </h2>
        <p className={"text-sm w-full  md:text-md md:w-2/3 "}>
          Organize, jot, and track your thoughts effortlessly. Simple. Fast.
          Powerful. Get started and keep your ideas within reach.
        </p>
        <Button className={"w-full md:w-1/2"}>
          <Link to={"/login"}>Get Started</Link>{" "}
        </Button>
      </div>
      <img className={"w-full sm:w-1/2 "} src={"/notes.png"} alt={"Notes"} />
    </div>
  );
}

export default Home;
