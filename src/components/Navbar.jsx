import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Ccontext/AuthContext.jsx";
import { useCart } from "../Ccontext/CartContext";

const MotionIconButton = motion(IconButton);
const MotionBadge = motion(Badge);
const MotionButton = motion(Button);

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const initials = user?.username
    ? user.username.substring(0, 2).toUpperCase()
    : "U";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" fontWeight={700} letterSpacing={-0.5}>
          <Box component="span" color="primary.main">
            fake
          </Box>
          store
        </Typography>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Cart">
            <MotionIconButton 
              color="inherit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <MotionBadge 
                badgeContent={totalItems} 
                color="primary"
                key={totalItems}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <ShoppingCartIcon />
              </MotionBadge>
            </MotionIconButton>
          </Tooltip>

          <Tooltip title={`Signed in as ${user?.username}`}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: 13,
                bgcolor: "primary.main",
                cursor: "pointer",
              }}
            >
              {initials}
            </Avatar>
          </Tooltip>

          <Tooltip title="Sign out">
            <MotionButton
              variant="text"
              size="small"
              startIcon={<LogoutIcon fontSize="small" />}
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              sx={{ textTransform: "none", color: "text.secondary" }}
            >
              Sign out
            </MotionButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
