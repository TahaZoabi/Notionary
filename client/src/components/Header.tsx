import NavBar from "@/components/NavBar.tsx";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth.tsx";
import { Button } from "@/components/ui/button.tsx";
function Header() {
  const { user, logoutUser } = useAuth();

  return (
    <header>
      <NavBar>
        <div className={"flex gap-5 items-center"}>
          <Link to={"/"}>
            {" "}
            <img
              src="/noteIcon.png"
              alt="logo"
              className={"w-[30px] sm:w-[50px]"}
            />
          </Link>

          <h2 className={"text-2xl sm:text-4xl font-semibold select-none"}>
            Notionary
          </h2>
        </div>
        <nav className={"flex justify-center items-center gap-5"}>
          {user ? (
            <>
              <Link className={"hover:scale-105 hover:text-gray-500"} to={"/"}>
                Home
              </Link>

              <Link
                className={"hover:scale-105 hover:text-gray-500"}
                to={"/notes"}
              >
                Notes
              </Link>
            </>
          ) : (
            <>
              <Link to={"/"} className={"hover:scale-105 hover:text-gray-500"}>
                Home
              </Link>
              <Link
                className={"hover:scale-105 hover:text-gray-500"}
                to={"/login"}
              >
                Login
              </Link>{" "}
              <Link
                className={"hover:scale-105 hover:text-gray-500"}
                to={"/signup"}
              >
                Signup
              </Link>
            </>
          )}
        </nav>
        <div>
          {user ? (
            <Button onClick={logoutUser}>Logout</Button>
          ) : (
            <Link to={"/login"}>
              <Button>Get Started</Button>
            </Link>
          )}
        </div>
      </NavBar>
    </header>
  );
}

export default Header;
