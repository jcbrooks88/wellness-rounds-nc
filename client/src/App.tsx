import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DiscussionPage from "./pages/Discussion";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SignupPage from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";

const App = () => {
  return (
    <Router>
      <NavBar /> {/* ✅ Moved NavBar outside of Routes */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/discussion" element={<DiscussionPage />}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* Fallback route for any undefined paths */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
