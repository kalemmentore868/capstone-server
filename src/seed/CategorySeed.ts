import CategoryModel from "../models/CategoryModel";
import ProductModel from "../models/ProductModel";

let categoryTitles = [
  "Fresh produce",
  "Dairy and Eggs",
  "Bakery",
  "Meat",
  "Snacks",
  "Beverages",
  "Frozen Foods",
  "Fast Foods",
  "Household Essentials",
];

let categoryDescriptions = [
  "Fruits, vegetables, herbs, and other fresh produce items that customers can order for delivery.",
  "Milk, cheese, butter, eggs, and other dairy products.",
  "Bread, bagels, croissants, pastries, cakes, and other baked goods.",
  "Chicken, beef, pork, fish, shrimp, and other types of meat and seafood.",
  " Chips, cookies, candy, chocolates, and other snacks and treats.",
  " Water, soda, juice, tea, coffee, and other beverages.",
  "Frozen meals, ice cream, vegetables, and other frozen items that customers can order.",
  "Burgers, fries, pizza, tacos, and other fast food items that customers can order for delivery.",
  "Paper products, cleaning supplies, and other household essentials that customers can add to their order.",
];

let categoryThumbnails = [
  "https://images.unsplash.com/photo-1489450278009-822e9be04dff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZyZXNoJTIwcHJvZHVjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1630356090105-808ba2fe97f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGFpcnklMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFrZXJ5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1591510669755-5e6dbb1ca33d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVhdCUyMHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1607977027972-e2aae2b5b1e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNuYWNrJTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1625865019845-7b2c89b8a8a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmV2ZXJhZ2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1601599967100-f16100982063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJvemVuJTIwZm9vZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1615996001375-c7ef13294436?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzdCUyMGZvb2RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNsZWFuaW5nJTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
];

export const seedCategories = async () => {
  await ProductModel.deleteAllProducts();
  await CategoryModel.deleteAllCategories();
  for (let i = 0; i < categoryTitles.length; i++) {
    const categoryObj = {
      title: categoryTitles[i],
      description: categoryDescriptions[i],
      thumbnail: categoryThumbnails[i],
    };

    // @ts-ignore
    await CategoryModel.createCategory(categoryObj);
  }
};
