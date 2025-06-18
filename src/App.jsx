import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import PublicProfile from "./pages/PublicProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route  path="/" element={<PrivateRoute> <Home /> </PrivateRoute> } />
          <Route path="/project" element={<PrivateRoute>  <Projects /> </PrivateRoute>} />
          <Route path="/u/:username" element={<PublicProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

