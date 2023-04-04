import { sendEmail } from "../../helpers/sendEmail";

test("send email", async () => {
  const data = await sendEmail(
    "kalemmalek123@gmail.com",
    "Test123",
    "just testing it buddy"
  );
  expect(data).toBe("Email Sent");
});

test("send email", async () => {
  const data = await sendEmail(
    "kalemmalek123@gmail.hulabaloo",
    "Test123",
    "just testing it buddy"
  );
  expect(data).toBe("Email Sent");
});
