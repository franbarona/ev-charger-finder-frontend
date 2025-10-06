import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { MapPositionProvider } from "./context/MapPositionContext";
import { BoundProvider } from "./context/BoundContext";
import { StationsProvider } from "./context/StationsContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ModalProvider } from "./context/ModalContext";
import { StationsSearchFiltersProvider } from "./context/StationsSearchFiltersContext";
import { MapZoomProvider } from "./context/MapZoomContext";
import TestPage from "./pages/TestPage";

function App () {
  return (
    <>
      <LoadingProvider>
        <AlertProvider>
          <MapPositionProvider>
            <BoundProvider>
              <StationsProvider>
                <StationsSearchFiltersProvider>
                  <ModalProvider>
                    <MapZoomProvider>
                      <Router>
                        <div className="relative w-screen h-screen">
                          <Navbar />
                          <main className={`relative w-full h-full`}>
                            <Routes>
                              <Route path="/" element={<HomePage />} />
                              <Route path="/test" element={<TestPage />} />
                            </Routes>
                            <footer className={`absolute flex bottom-4 right-0 text-[var(--color-text-secondary)] text-xs text-center whitespace-nowrap`}>
                              <Link to="https://www.franbarona.dev" target="_blank" rel="noopener noreferrer" className="hover:underline bg-gray-100/90 px-4 py-0.5">
                                © {new Date().getFullYear()}, Fran Barona
                              </Link>
                            </footer>
                          </main>
                        </div>
                      </Router>
                    </MapZoomProvider>
                  </ModalProvider>
                </StationsSearchFiltersProvider>
              </StationsProvider>
            </BoundProvider>
          </MapPositionProvider>
        </AlertProvider>
      </LoadingProvider>
    </>
  )
}

export default App