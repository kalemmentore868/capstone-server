import { ProductType } from "../models/ProductModel";

interface QueryType {
  query?: string;
  sort?: string;
  category_id?: string;
}

export function applyFilters(
  products: ProductType[],
  { query, sort, category_id }: QueryType
) {
  const filteredProducts = [];

  for (const product of products) {
    if (query && !product.title.toLowerCase().includes(query.toLowerCase())) {
      continue;
    }
    filteredProducts.push(product);
  }

  let sortedProducts = filteredProducts.sort((a, b) => {
    switch (sort) {
      case "price- high to low":
        return b.price - a.price;
      case "price- low to high":
        return a.price - b.price;
      case "newest arrivals":
        return b.created_at.getTime() - a.created_at.getTime();
      case "popularity":
        return Number(b.is_best_seller) - Number(a.is_best_seller);
      default:
        return a.title.localeCompare(b.title);
    }
  });

  let categorized_products: ProductType[] = [];

  if (category_id?.length && category_id.length > 0) {
    let categoryId = parseInt(category_id);
    for (const product of sortedProducts) {
      if (product.category_id === categoryId) {
        categorized_products.push(product);
      }
    }
    return categorized_products;
  }

  return sortedProducts;
}
