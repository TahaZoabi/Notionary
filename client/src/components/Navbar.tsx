import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
function Navbar() {
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = user ? (
    <>
      <Link className={"hover:scale-105 hover:text-gray-500"} to={"/"}>
        Home
      </Link>

      <Link className={"hover:scale-105 hover:text-gray-500"} to={"/notes"}>
        Notes
      </Link>
    </>
  ) : (
    <>
      <Link to={"/"} className={"hover:scale-105 hover:text-gray-500"}>
        Home
      </Link>
      <Link className={"hover:scale-105 hover:text-gray-500"} to={"/login"}>
        Login
      </Link>{" "}
      <Link className={"hover:scale-105 hover:text-gray-500"} to={"/signup"}>
        Signup
      </Link>
    </>
  );

  return (
    <header>
      <div
        className={
          "flex justify-between items-center bg-popover shadow-sm w-full p-4 mb-10"
        }
      >
        <div className={"flex gap-5 items-center"}>
          <Link to={"/"}>
            {" "}
            <img
              src="/noteIcon.png"
              alt="logo"
              className={"w-[30px] sm:w-[50px]"}
            />
          </Link>

          <h2
            className={
              "text-xl sm:text-2xl md:text-4xl font-semibold select-none"
            }
          >
            Notionary
          </h2>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Menu
              className={`hover:text-accent md:hidden`}
              onClick={() => setIsOpen(true)}
            />
          </SheetTrigger>
          <SheetContent className={`"w-[400px] md:hidden`}>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <div className={"flex flex-col justify-start items-center gap-5"}>
              {NavLinks}
            </div>
          </SheetContent>
        </Sheet>
        <nav
          className={
            " justify-center items-center gap-5 hidden md:flex mx-auto"
          }
        >
          {NavLinks}
        </nav>
        <div className={"hidden md:block"}>
          {user ? (
            <Button onClick={logoutUser}>Logout</Button>
          ) : (
            <Link to={"/login"}>
              <Button>Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
