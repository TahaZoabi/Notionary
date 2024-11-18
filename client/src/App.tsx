import Footer from "@/components/Footer.tsx";
import Header from "@/components/Header.tsx";
import { Route, Routes } from "react-router-dom";
import LogIn from "@/pages/LogIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<LogIn />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
