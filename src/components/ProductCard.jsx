import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../Ccontext/CartContext";

export default function ProductCard({ product, onClick }) {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.15s, box-shadow 0.15s",
        "&:hover": { borderColor: "primary.main", boxShadow: "0 0 0 1px" },
      }}
    >
      <CardActionArea onClick={() => onClick(product)} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.50",
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ maxHeight: 140, objectFit: "contain", width: "auto" }}
          />
        </Box>

        <CardContent sx={{ pb: 1 }}>
          <Chip
            label={product.category}
            size="small"
            sx={{
              mb: 1,
              fontSize: 11,
              height: 20,
              textTransform: "capitalize",
            }}
          />
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.4,
              mb: 1,
            }}
          >
            {product.title}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          pb: 1.5,
        }}
      >
        <Typography variant="h6" fontWeight={700} color="primary.main">
          {product.formattedPrice}
        </Typography>
        <Tooltip title="Add to cart">
          <IconButton
            size="small"
            color="primary"
            onClick={handleAddToCart}
            sx={{
              bgcolor: "primary.50",
              "&:hover": { bgcolor: "primary.100" },
            }}
          >
            <AddShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}
