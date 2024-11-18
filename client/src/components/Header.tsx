import NavBar from "@/components/NavBar.tsx";

function Header() {
  return (
    <header>
      <NavBar>
        <div className={"flex gap-5 items-center"}>
          <img
            src="/noteIcon.png"
            alt="logo"
            className={"w-[30px] sm:w-[50px]"}
          />
          <h2 className={"text-2xl sm:text-4xl font-semibold"}>Notionary</h2>
        </div>
      </NavBar>
    </header>
  );
}

export default Header;
