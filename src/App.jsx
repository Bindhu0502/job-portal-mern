import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main className="app-container">
        <AppRoutes />
      </main>

      <Footer />
    </>
  );
}

export default App;