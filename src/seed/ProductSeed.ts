import CategoryModel from "../models/CategoryModel";
import ProductModel, { ProductType } from "../models/ProductModel";

const productTitles = [
  "cheese",
  "eggs",
  "sausage",
  "case of water",
  "macaroni",
  "chicken",
  "kool kids",
  "coca-cola",
  "apples",
  "seasoning",
  "butter",
  "milk",
  "cereal",
  "bread",
];

const productDesc = [
  "Cheese - A dairy product made from milk that is typically yellow or white in color and has a tangy, sharp, or mild flavor. It is used in a variety of dishes, including sandwiches, pizza, and pasta.",
  "Eggs - A food product produced by birds, typically hens. They are used in a variety of dishes, including breakfast foods, baked goods, and desserts.",
  "Sausage - A meat product made from ground meat, often pork, and spices. It can be served in a variety of ways, such as grilled, fried, or baked, and is often used as a breakfast food.",
  "Case of Water - A package of bottled water typically containing multiple individual bottles, used for drinking and hydration.",
  "Macaroni - A type of pasta with a small, curved shape. It is often used in pasta dishes, such as macaroni and cheese.",
  "Chicken - A type of poultry often used in cooking, with white or dark meat, which can be prepared in a variety of ways, including grilling, baking, and frying.",
  "Case of Kool Kids - a popular juice",
  "Case of Coca-Cola - A popular carbonated soft drink, typically packaged in cans or bottles.",
  "Apples - A fruit with a crisp texture and sweet or tart flavor. It can be eaten fresh or used in a variety of dishes, such as pies and salads.",
  "Seasoning - A mixture of spices and herbs used to enhance the flavor of food. Common seasonings include salt, pepper, garlic powder, and paprika.",
  "Butter - A dairy product made from milk or cream that is typically used in cooking and baking.",
  "Milk - A dairy product produced by mammals, typically cows. It is used in a variety of foods and beverages, such as cereal, coffee, and smoothies.",
  "Cereal - A breakfast food made from grains, often eaten with milk. It comes in a variety of flavors and types, such as flakes, puffs, and granola.",
  "Bread - A baked food made from flour, water, and yeast or another leavening agent. It comes in a variety of types, such as white, wheat, and sourdough.",
];

const productPrices = [30, 22, 28, 25, 18, 20, 28, 30, 20, 20, 8, 12, 30, 18];

const productImgUrls = [
  "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNoZWVzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZWdnc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1621800973389-768626d38a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhdXNhZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ym90dGxlZCUyMHdhdGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1590060846796-0418842f3908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYXJvbml8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1590012040529-c5e12f37b5d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8anVpY2UlMjBib3h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29rZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1610397962076-02407a169a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2Vhc29uaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1620189507195-68309c04c4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWlsa3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1504308805006-0f7a5f1f0f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VyZWFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnJlYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
];

const categories = [
  "Dairy and Eggs",
  "Dairy and Eggs",
  "Meat",
  "Beverages",
  "Snacks",
  "Meat",
  "Beverages",
  "Beverages",
  "Fresh produce",
  "Fresh produce",
  "Dairy and Eggs",
  "Dairy and Eggs",
  "Snacks",
  "Bakery",
];

export const seedProducts = async () => {
  for (let i = 0; i < productTitles.length; i++) {
    const category = await CategoryModel.getCategoryByTitle(categories[i]);
    // @ts-ignore
    const productObj: ProductType = {
      title: productTitles[i],
      price: productPrices[i],
      description: productDesc[i],
      img_url: productImgUrls[i],
      rating: 3,
      is_best_seller: false,
      seller_id: 2,
      category_id: category.id,
    };

    await ProductModel.createProduct(productObj);
  }
};
