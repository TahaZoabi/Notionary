import Footer from "@/components/Footer.tsx";
import Header from "@/components/Header.tsx";

function App() {
  return (
    <>
      <Header />
      <div
        className={" h-screen flex justify-center items-center gap-5 flex-col"}
      >
        <Footer />
      </div>
    </>
  );
}

export default App;
