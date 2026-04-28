import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import AboutUsPage from "@/pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />

            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
