import Footer from "@/components/Footer.tsx";
import { Route, Routes, Navigate } from "react-router-dom";
import LogIn from "@/pages/LogIn";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import PrivateRoutes from "@/lib/PrivateRoutes.tsx";
import Notes from "@/pages/notes";
import { useAuth } from "@/contexts/auth.tsx";
import Navbar from "@/components/Navbar.tsx";
import Notfound from "@/pages/NotFound";

function App() {
  const { user } = useAuth();
  return (
    <div className={"max-w-[1200px] mx-auto"}>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/*Private notes route goes here*/}
          <Route path={"notes"} element={<Notes />} />
        </Route>
        <Route path={"/"} element={<Home />} />
        <Route
          path={"/login"}
          element={user ? <Navigate to={"/"} /> : <LogIn />}
        />
        <Route
          path={"/signup"}
          element={user ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
