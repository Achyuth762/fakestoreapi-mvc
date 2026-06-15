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
import { useAuth } from "../Ccontext/AuthContext.jsx";
import { useCart } from "../Ccontext/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const initials = user?.username
    ? user.username.substring(0, 2).toUpperCase()
    : "U";

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
            <IconButton color="inherit">
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
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
            <Button
              variant="text"
              size="small"
              startIcon={<LogoutIcon fontSize="small" />}
              onClick={logout}
              sx={{ textTransform: "none", color: "text.secondary" }}
            >
              Sign out
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
