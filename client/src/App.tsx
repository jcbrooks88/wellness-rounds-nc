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
import DiscussionResults from "./components/discussions/DiscussionResults";
import TimelinePage from "./pages/TimelinePage";
import "./App.css"; // import styles here

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/timeline" element={<ProtectedRoute><TimelinePage /></ProtectedRoute>} />
            <Route path="/discussion" element={<ProtectedRoute><DiscussionPage /></ProtectedRoute>} />
            <Route path="/discussions/:id" element={<ProtectedRoute><DiscussionResults /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
