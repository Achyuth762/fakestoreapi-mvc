import { Box, Button, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
      }}
    >
      <Container maxWidth="sm">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: "center" }}
        >
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: 120, color: "primary.main", mb: 2 }}
            />
          </MotionBox>

          <Typography
            variant="h1"
            fontWeight={700}
            color="primary.main"
            gutterBottom
          >
            404
          </Typography>

          <Typography variant="h5" fontWeight={600} gutterBottom>
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, mt: 2 }}
          >
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </Typography>

          <MotionButton
            component={Link}
            to="/store"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 4,
              py: 1.5,
            }}
          >
            Back to Store
          </MotionButton>
        </MotionBox>
      </Container>
    </Box>
  );
}
