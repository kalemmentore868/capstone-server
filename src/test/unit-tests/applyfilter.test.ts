import { applyFilters } from "../../helpers/applyFilter";
import { ProductType } from "../../models/ProductModel";

describe("applyFilters", () => {
  const products: ProductType[] = [
    {
      id: 1,
      title: "Product 1",
      description: "Description 1",
      category_id: 1,
      rating: 4.5,
      is_best_seller: true,
      img_url: "image1.png",
      seller_id: 1,
      price: 10,
      created_at: new Date("2022-01-01"),
    },
    {
      id: 2,
      title: "Product 2",
      description: "Description 2",
      category_id: 2,
      rating: 3.5,
      is_best_seller: false,
      img_url: "image2.png",
      seller_id: 2,
      price: 20,
      created_at: new Date("2022-02-01"),
    },
    {
      id: 3,
      title: "Product 3",
      description: "Description 3",
      category_id: 1,
      rating: 5,
      is_best_seller: true,
      img_url: "image3.png",
      seller_id: 1,
      price: 15,
      created_at: new Date("2022-03-01"),
    },
  ];

  it("should return all products when no filters are applied", () => {
    const result = applyFilters(products, {});
    expect(result).toEqual(products);
  });

  it("should filter products by title when query is provided", () => {
    const result = applyFilters(products, { query: "product 1" });
    expect(result).toEqual([products[0]]);
  });

  it("should sort products by price in descending order when 'price- high to low' is provided as sort", () => {
    const result = applyFilters(products, { sort: "price- high to low" });
    expect(result).toEqual([products[1], products[2], products[0]]);
  });

  it("should sort products by price in ascending order when 'price- low to high' is provided as sort", () => {
    const result = applyFilters(products, { sort: "price- low to high" });
    expect(result).toEqual([products[0], products[2], products[1]]);
  });

  it("should sort products by newest arrivals when 'newest arrivals' is provided as sort", () => {
    const result = applyFilters(products, { sort: "newest arrivals" });
    expect(result).toEqual([products[2], products[1], products[0]]);
  });

  it("should sort products by rating in descending order when 'popularity' is provided as sort", () => {
    const result = applyFilters(products, { sort: "popularity" });
    expect(result).toEqual([products[2], products[0], products[1]]);
  });

  it("should sort products by title in ascending order when no valid sort is provided", () => {
    const result = applyFilters(products, { sort: "invalid sort" });
    expect(result).toEqual([products[0], products[1], products[2]]);
  });

  it("should filter products by category when category_id is provided", () => {
    const result = applyFilters(products, { category_id: "1" });
    expect(result).toEqual([products[0], products[2]]);
  });

  it("should return an empty array when no products are provided", () => {
    const result = applyFilters([], {});
    expect(result).toEqual([]);
  });

  it("should return all products when query is an empty string", () => {
    const result = applyFilters(products, { query: "" });
    expect(result).toEqual(products);
  });

  it("should return no products when category_id is not a valid number", () => {
    const result = applyFilters(products, { category_id: "invalid" });
    expect(result).toEqual([]);
  });

  it("should return no products when category_id is not present in any product", () => {
    const result = applyFilters(products, { category_id: "3" });
    expect(result).toEqual([]);
  });
});
