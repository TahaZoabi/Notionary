import Footer from "@/components/Footer.tsx";
import Header from "@/components/Header.tsx";
import { Route, Routes } from "react-router-dom";
import LogIn from "@/pages/LogIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import PrivateRoutes from "@/lib/PrivateRoutes.tsx";
import Notes from "@/components/Notes.tsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/*Private notes route goes here*/}
          <Route path={"notes"} element={<Notes />} />
        </Route>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<LogIn />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
