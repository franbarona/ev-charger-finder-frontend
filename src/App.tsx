import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { LoadingProvider } from "./context/LoadingContext";
import { ModalProvider } from "./context/ModalContext";
import { AboutSectionProvider } from "./context/AboutSectionContext";

function App() {
  return (
    <>
      <LoadingProvider>
        <AlertProvider>
          <ModalProvider>
            <AboutSectionProvider>
              <Router>
                <div className="relative w-screen h-screen">
                  <Navbar />
                  <main className={`relative w-full h-full`}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                    </Routes>
                    <footer
                      className={`absolute flex bottom-4 right-0 text-[var(--color-text-secondary)] text-xs text-center whitespace-nowrap`}
                    >
                      <Link
                        to="https://www.franbarona.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline bg-gray-100/90 px-4 py-0.5"
                      >
                        © {new Date().getFullYear()}, Fran Barona
                      </Link>
                    </footer>
                  </main>
                </div>
              </Router>
            </AboutSectionProvider>
          </ModalProvider>
        </AlertProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
