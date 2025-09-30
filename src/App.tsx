import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { MapPositionProvider } from "./context/MapPositionContext";
import { BoundProvider } from "./context/BoundContext";
import { StationsProvider } from "./context/StationsContext";
import { LoadingProvider } from "./context/LoadingContext";

function App () {
  return (
    <>
      <LoadingProvider>
        <AlertProvider>
          <MapPositionProvider>
            <BoundProvider>
              <StationsProvider>
                <Router>
                  <>
                    <div className="relative w-screen h-screen">
                      {/* <header className="absolute shadow-2xl z-50 w-[80vw] max-w-5xl mx-auto top-2 left-0 right-0 rounded-2xl  border-b-1 border-gray-300 frosted-bg"> */}
                        <Navbar />
                      {/* </header> */}
                      <main className={`relative w-full h-full`}>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                        </Routes>
                        <footer className={`absolute flex bottom-4 right-0 text-[var(--color-text-secondary)] text-xs text-center whitespace-nowrap`}>
                          <Link to="https://www.franbarona.dev" target="_blank" rel="noopener noreferrer" className="hover:underline bg-gray-100/90 px-4 py-0.5">
                            © {new Date().getFullYear()}, Fran Barona
                          </Link>
                        </footer>
                      </main>
                    </div>
                  </>
                </Router>
              </StationsProvider>
            </BoundProvider>
          </MapPositionProvider>
        </AlertProvider>
      </LoadingProvider>
    </>
  )
}

export default App