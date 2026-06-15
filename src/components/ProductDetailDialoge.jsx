import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { useCart } from "../Ccontext/CartContext";

export default function ProductDetailDialog({ product, open, onClose }) {
  const { addItem } = useCart();
  const [snackOpen, setSnackOpen] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product);
    setSnackOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Chip
            label={product.category}
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {/* Image */}
            <Box
              sx={{
                flexShrink: 0,
                width: { xs: "100%", sm: 180 },
                height: { xs: 180, sm: 200 },
                bgcolor: "grey.50",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
                lineHeight={1.4}
              >
                {product.title}
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
                color="primary.main"
                gutterBottom
              >
                {product.formattedPrice}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="body2"
                color="text.secondary"
                lineHeight={1.7}
              >
                {product.description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAdd}
              sx={{ borderRadius: 2, textTransform: "none", flex: 1 }}
            >
              Add to cart
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2 }}
          onClose={() => setSnackOpen(false)}
        >
          Added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}
