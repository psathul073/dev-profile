import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
const Projects = lazy(() => import("./pages/Projects"));
const PublicProfile = lazy(() => import("./pages/PublicProfile"));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
            <Route path="/project" element={<PrivateRoute> <Suspense fallback={<Loader/>}> <Projects /> </Suspense> </PrivateRoute>} />
            <Route path="/u/:username" element={<Suspense fallback={<Loader />} > <PublicProfile /> </Suspense> } />
            {/* 404 */}
            <Route path="*" element={<PrivateRoute> <Home /> </PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>

  );
}

export default App;

