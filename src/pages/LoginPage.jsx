import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "../Ccontext/AuthContext.jsx";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the page they tried to visit, or default to /store
  const from = location.state?.from?.pathname || "/store";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(username, password);
      // Navigate to the page they tried to visit or /store
      navigate(from, { replace: true });
    } catch {
      setError("Invalid credentials. Try: mor_2314 / 83r5^_");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
        p: 2,
      }}
    >
      <MotionCard
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        sx={{ width: "100%", maxWidth: 400, borderRadius: 3 }}
        elevation={0}
        variant="outlined"
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Welcome
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              autoComplete="username"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              size="small"
              sx={{ mb: 3 }}
              autoComplete="current-password"
            />
            <MotionButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              sx={{
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 14,
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Sign in"
              )}
            </MotionButton>
          </Box>

          <Divider sx={{ my: 2 }} />
        </CardContent>
      </MotionCard>
    </MotionBox>
  );
}
