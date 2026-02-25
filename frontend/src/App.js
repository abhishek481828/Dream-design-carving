import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OrderUs from "./pages/OrderUs";
import Designs from "./pages/Designs";
import CategoryProducts from "./pages/CategoryProducts";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AdminLogin from "./pages/AdminLogin";
import AdminOrders from "./pages/AdminOrders";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminResetPassword from "./pages/AdminResetPassword";
import ProductDetails from "./pages/ProductDetails";
import AdminProducts from "./pages/AdminProducts";
import AdminMessages from "./pages/AdminMessages";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.css";

function isTokenValid() {
  const token = localStorage.getItem("adminToken");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function AppLayout({ adminLoggedIn, setAdminLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin");
  const isAdminAuth = isAdmin && location.pathname !== "/admin/login"
    && !location.pathname.startsWith("/admin/forgot-password")
    && !location.pathname.startsWith("/admin/reset-password");

  // Logout on browser back button while on protected admin pages
  useEffect(() => {
    if (!isAdminAuth) return;

    // Push a sentinel state so the first Back press is catchable
    window.history.pushState({ adminSentinel: true }, "");

    const handlePopState = () => {
      localStorage.removeItem("adminToken");
      setAdminLoggedIn(false);
      navigate("/admin/login", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [location.pathname]); // re-run on every admin page change

  // body class for no-navbar styling
  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add("admin-body");
    } else {
      document.body.classList.remove("admin-body");
    }
    return () => document.body.classList.remove("admin-body");
  }, [isAdmin]);

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderUs />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin onLogin={() => setAdminLoggedIn(true)} />} />
        <Route
          path="/admin/orders"
          element={
            adminLoggedIn
              ? <ErrorBoundary><AdminOrders /></ErrorBoundary>
              : <AdminLogin onLogin={() => setAdminLoggedIn(true)} />
          }
        />
        <Route path="/admin/products" element={adminLoggedIn ? <AdminProducts /> : <AdminLogin onLogin={() => setAdminLoggedIn(true)} />} />
        <Route path="/admin/messages" element={adminLoggedIn ? <AdminMessages /> : <AdminLogin onLogin={() => setAdminLoggedIn(true)} />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/reset-password/:token" element={<AdminResetPassword />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(isTokenValid());

  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ToastContainer position="top-right" autoClose={3000} />
          <AppLayout adminLoggedIn={adminLoggedIn} setAdminLoggedIn={setAdminLoggedIn} />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
