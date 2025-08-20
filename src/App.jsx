import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Rooms from "./pages/Rooms.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import ImageOptimizer from "./pages/ImageOptimizer.jsx";
import RoomDetail from "./pages/RoomDetail.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import PasswordChange from "./pages/PasswordChange.jsx";
import AdminRooms from "./pages/admin/AdminRooms.jsx";
import Administrador from "./pages/admin/Administrador.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";


function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-change" element={<PasswordChange />} />

        <Route path="explore" element={<Explore />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="rooms/:id" element={<RoomDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="optimize" element={<ImageOptimizer />} />
        <Route path="*" element={<NotFound />} />
        
        {/* <Route path="/admin" element={<Administrador />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/users" element={<AdminUsers />} /> */}
       
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Administrador />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute>
              <AdminRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        
      </Route>

      
    </Routes>
  );
}
