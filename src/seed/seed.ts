import { seedCategories } from "./CategorySeed";
import { seedProducts } from "./ProductSeed";

const seed = async () => {
  await seedCategories();
  await seedProducts();
  console.log("done");
};

seed();
