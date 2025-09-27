import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App () {
  return (
    <>
      <AlertProvider>
        <Router>
          <>
            <div className="relative flex flex-col w-screen h-screen">
              <header className="shadow-2xl z-50 w-screen">
                <Navbar />
              </header>
              <main className={`relative w-full h-full`}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
                <footer className={`absolute flex bottom-5 right-5 text-[var(--color-text-secondary)] text-xs md:text-sm text-center whitespace-nowrap`}>
                  <Link to="https://www.franbarona.dev" target="_blank" rel="noopener noreferrer" className="hover:underline bg-gray-200/80 px-4 rounded-full shadow-lg">
                    © {new Date().getFullYear()}, Fran Barona
                  </Link>
                </footer>
              </main>
            </div>
          </>
        </Router>
      </AlertProvider>
    </>
  )
}

export default App