import { getOrdersAsString } from "../../src/helpers/formatOrderEmail";

test("return string of orders", async () => {
  const data = await getOrdersAsString(1);
  expect(data).toMatch(new RegExp(`Item Name: milk`));
});
