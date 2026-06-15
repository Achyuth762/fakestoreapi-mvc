import { AuthProvider, useAuth } from "./Ccontext/AuthContext.jsx";
import { CartProvider } from "./Ccontext/CartContext";
import LoginPage from "./pages/LoginPage";
import StorePage from "./pages/Store";

function AppRoutes() {
  const { user } = useAuth();
  return user ? <StorePage /> : <LoginPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}
