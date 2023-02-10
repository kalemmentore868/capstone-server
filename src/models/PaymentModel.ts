import mongoose, { Schema } from "mongoose";

const paymentSchema: Schema = new Schema({
  cardNumber: String,
  cardHolderName: String,
  expiryDate: String,
  cvc: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  userId: String,
});

const PaymentModel = mongoose.model("payments", paymentSchema);

export default PaymentModel;
