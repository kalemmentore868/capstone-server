const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//@ts-ignore
const User = require("./UserModel.js");
//@ts-ignore
const Product = require("./ProductModel.js");

console.log(process.env.DB_USERNAME);
// Connect to the MongoDB database
mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://zimbabwe123:SLIR7CaDFLhEeZ4z@cluster0.vdzofgq.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Mongo connection open");
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

// Delete all documents in the Users collection
User.deleteMany({}, (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
});

// Delete all documents in the Products collection
Product.deleteMany({}, (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }
});

function generateUsers() {
  const users = [];
  const firstNames = [
    "John",
    "Jane",
    "Jim",
    "Jessica",
    "Jake",
    "Jenny",
    "Jack",
    "Julie",
    "Justin",
    "Joan",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
  ];
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    "zoho.com",
  ];

  for (let i = 0; i < 10; i++) {
    const first_name =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const last_name = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@${
      domains[Math.floor(Math.random() * domains.length)]
    }`;
    const password = Math.random().toString(36).slice(-8);
    const is_admin = Math.random() >= 0.5;

    users.push({ first_name, last_name, email, password, is_admin });
  }

  return users;
}

// Array of 10 User objects to be inserted into the database
const users = generateUsers();

function generateProducts() {
  const products = [];
  const titles = [
    "Apple",
    "Banana",
    "Carrot",
    "Donut",
    "Eggplant",
    "Fish",
    "Grapes",
    "Honey",
    "Ice Cream",
    "Jelly",
  ];
  const descriptions = [
    "A sweet, juicy fruit.",
    "A delicious, sweet treat.",
    "A healthy, crunchy snack.",
    "A soft, sweet pastry.",
    "A flavorful, purple vegetable.",
    "A tasty, lean protein source.",
    "A juicy, sweet snack.",
    "A natural, sweet syrup.",
    "A creamy, frozen treat.",
    "A sweet, spreadable treat.",
  ];
  const prices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const img_urls = [
    "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9udXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1615484477201-9f4953340fab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "hhttps://images.unsplash.com/photo-1537640538966-79f369143f8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhcGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG9uZXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHJhbmRvbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  ];

  for (let i = 0; i < 10; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const price = prices[Math.floor(Math.random() * prices.length)];
    const img_url = img_urls[Math.floor(Math.random() * img_urls.length)];

    products.push({ title, description, price, img_url });
  }

  return products;
}

// Array of 10 Product objects to be inserted into the database
const products = generateProducts();

// Insert the 10 User objects into the database
User.create(users, (error, docs) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  console.log(`${docs.length} users were inserted into the database.`);
});

// Insert the 10 Product objects into the database
Product.create(products, (error, docs) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  console.log(`${docs.length} products were inserted into the database.`);
});
