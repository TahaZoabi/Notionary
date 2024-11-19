import NavBar from "@/components/NavBar.tsx";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <NavBar>
        <div className={"flex gap-5 items-center"}>
          <Link to={"/home"}>
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
        <ul className={"flex justify-center items-center gap-5"}>
          <li className={"hover:scale-105 hover:text-gray-500"}>
            <Link to={"/home"}>Home</Link>
          </li>
          <li className={" hover:scale-105 hover:text-gray-500"}>
            <Link to={"/notes"}>Notes</Link>
          </li>
          <li className={"hover:scale-105  hover:text-gray-500"}>
            <Link to={"/login"}>LogIn</Link>
          </li>
        </ul>
        <div>User stuff here</div>
      </NavBar>
    </header>
  );
}

export default Header;
