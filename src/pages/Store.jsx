import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchProducts,
  fetchCategories,
} from "../controller/ProductController";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionChip = motion(Chip);

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [prods, cats] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch {
        setError("Failed to load products. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Navbar />

      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 4 }}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            All Products
            {!loading && (
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                ml={1}
              >
                ({filtered.length})
              </Typography>
            )}
          </Typography>
        </MotionBox>

        <MotionStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 3 }}
        >
          <MotionChip
            label="All"
            clickable
            color={activeCategory === "all" ? "primary" : "default"}
            variant={activeCategory === "all" ? "filled" : "outlined"}
            onClick={() => setActiveCategory("all")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
          {categories.map((cat, index) => (
            <MotionChip
              key={cat}
              label={cat}
              clickable
              color={activeCategory === cat ? "primary" : "default"}
              variant={activeCategory === cat ? "filled" : "outlined"}
              onClick={() => setActiveCategory(cat)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{ textTransform: "capitalize" }}
            />
          ))}
        </MotionStack>

        {error && (
          <Typography color="error" textAlign="center" mt={6}>
            {error}
          </Typography>
        )}

        <Grid container spacing={2}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Skeleton variant="rectangular" height={180} />
                    <Box sx={{ p: 2 }}>
                      <Skeleton width="40%" height={20} sx={{ mb: 1 }} />
                      <Skeleton height={16} />
                      <Skeleton width="80%" height={16} sx={{ mb: 1 }} />
                      <Skeleton width="30%" height={24} />
                    </Box>
                  </Box>
                </Grid>
              ))
            : filtered.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
        </Grid>

        {!loading && filtered.length === 0 && !error && (
          <Typography color="text.secondary" textAlign="center" mt={8}>
            No products found in this category.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
