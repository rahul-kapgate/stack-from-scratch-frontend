import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import AuthPage from "@/pages/AuthPage"
import Dashboard from "@/pages/Dashboard"
import InterviewRoom from "@/pages/InterviewRoom"
import InterviewResults from "@/pages/InterviewResults"
import LandingPage from "./pages/LandingPage"
import ForgotPasswordPage from "@/pages/ForgotPasswordPage"


export default function App() {
  return (
    <BrowserRouter>
     <div className="min-h-screen flex flex-col bg-[#060b14] overflow-x-hidden">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview" element={<InterviewRoom />} />
            <Route path="/results" element={<InterviewResults />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}