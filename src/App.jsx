import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { ToastProvider } from "d9-toast";
import { lazy } from "react";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const PublicProfile = lazy(() => import("./pages/PublicProfile"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const APIDocPage = lazy(() => import("./pages/APIDocPage"));

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SidebarProvider>
          <Router>
          <Routes>
            {/* Private routes */}
            <Route  path="/" element={<AuthProvider><HomePage /></AuthProvider>}/>
            <Route path="/api-doc" element={<AuthProvider><APIDocPage /></AuthProvider>}/>
            <Route path="/project" element={<AuthProvider><ProjectPage /></AuthProvider> }/>
            <Route path="/profile" element={<AuthProvider><ProfilePage /></AuthProvider>}/>
            <Route path="/settings" element={<AuthProvider><SettingsPage /></AuthProvider>}/>
          
            {/* 404 */}
            <Route path="*" element={<AuthProvider><HomePage /></AuthProvider>} />

            {/* Public route */}
            <Route path="/u/:username" element={<PublicProfile />} /> 
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/terms-conditions" element={<TermsCondition />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          </Routes>
        </Router>
      </SidebarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
