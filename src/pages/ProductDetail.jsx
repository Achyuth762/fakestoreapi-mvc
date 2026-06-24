import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Typography,
  Skeleton,
  Alert,
  Breadcrumbs,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Navbar from "../components/Navbar";
import { useCart } from "../Ccontext/CartContext";
import { getProductById } from "../api/fakestore";
import { Product } from "../models/Product";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProductById(id);
        setProduct(new Product(data));
      } catch (err) {
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Skeleton width={200} height={40} sx={{ mb: 3 }} />
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Skeleton
              variant="rectangular"
              width={400}
              height={400}
              sx={{ borderRadius: 3 }}
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="60%" height={40} sx={{ mb: 2 }} />
              <Skeleton width="30%" height={50} sx={{ mb: 2 }} />
              <Skeleton width="100%" height={100} sx={{ mb: 2 }} />
              <Skeleton width={200} height={60} />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || "Product not found"}
          </Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/store")}
            sx={{ textTransform: "none" }}
          >
            Back to Store
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <MotionBox
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 3 }}
          >
            <Link
              to="/store"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: 14,
              }}
            >
              Store
            </Link>
            <Typography color="text.primary" fontSize={14}>
              {product.category}
            </Typography>
            <Typography color="text.primary" fontSize={14} fontWeight={600}>
              {product.title.length > 30
                ? product.title.substring(0, 30) + "..."
                : product.title}
            </Typography>
          </Breadcrumbs>
        </MotionBox>

        {/* Product Detail */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            p: 4,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Product Image */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                width: { xs: "100%", md: 400 },
                height: 400,
                bgcolor: "grey.50",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                flexShrink: 0,
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </MotionBox>

            {/* Product Info */}
            <Box sx={{ flex: 1 }}>
              <Chip
                label={product.category}
                size="small"
                sx={{
                  mb: 2,
                  textTransform: "capitalize",
                  bgcolor: "primary.50",
                  color: "primary.main",
                }}
              />

              <Typography variant="h4" fontWeight={700} gutterBottom>
                {product.title}
              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                color="primary.main"
                sx={{ mb: 3 }}
              >
                {product.formattedPrice}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                color="text.secondary"
              >
                Description
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                lineHeight={1.8}
                sx={{ mb: 4 }}
              >
                {product.description}
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <MotionButton
                  variant="contained"
                  size="large"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 4,
                    py: 1.5,
                    flex: { xs: 1, sm: "initial" },
                  }}
                >
                  Add to Cart
                </MotionButton>

                <MotionButton
                  variant="outlined"
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/store")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
              </Box>

              {/* Success Message */}
              {addedToCart && (
                <MotionBox
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  sx={{ mt: 2 }}
                >
                  <Alert severity="success" sx={{ borderRadius: 2 }}>
                    Product added to cart successfully!
                  </Alert>
                </MotionBox>
              )}
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
