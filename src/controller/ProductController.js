import {
  getAllProducts,
  getCategories,
} from "../api/fakestore";
import { Product } from "../models/Product";

export async function fetchProducts() {
  const raw = await getAllProducts();
  return raw.map((item) => new Product(item));
}

export async function fetchCategories() {
  return await getCategories();
}
