import { getOrdersAsString } from "../../helpers/formatOrderEmail";

test("return string of orders", async () => {
  const data = await getOrdersAsString(1);
  expect(data).toContain(`    
        Item Name: milk
        Price: $12
        Quantity: 2`);
});

test("return string of orders", async () => {
  const data = await getOrdersAsString(1);
  expect(data).toContain(`    
        Item Name: cheese
        Price: $30
        Quantity: 2`);
});
