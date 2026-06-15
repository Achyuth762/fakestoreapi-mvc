export class Product {
  constructor(data) {
    this.id = data.id ?? null;
    this.title = data.title || "Unknown Product";
    this.price = typeof data.price === "number" ? data.price : 0;
    this.image = data.image || "";
    this.category = data.category || "uncategorized";
    this.description = data.description || "";
    this.rating = data.rating?.rate ?? 0;
    this.ratingCount = data.rating?.count ?? 0;
  }

  get formattedPrice() {
    return `$${this.price.toFixed(2)}`;
  }
}
