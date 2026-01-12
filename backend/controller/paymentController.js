const path = require("path");
const {
  createOrder,
  getPaymentStatus,
} = require("../services/cashfreeService2");
const Payment = require("../models/paymentModel");

// exports.getPaymentPage = (req, res) => {
//   res.sendFile(path.join(__dirname, "../views/index.html"));
// };

exports.processPayment = async (req, res) => {
  const orderId = "ORDER-" + Date.now();
  const orderAmount = 2000;
  const orderCurrency = "INR";
  const customerID = "1";
  const customerPhone = "9999999999";

  try {
    //* Create an order in Cashfree and get the payment session ID
    const paymentSessionId = await createOrder(
      orderId,
      orderAmount,
      orderCurrency,
      customerID,
      customerPhone
    );

    //* Save payment details to the database
    await Payment.create({
      orderId,
      paymentSessionId,
      orderAmount,
      orderCurrency,
      paymentStatus: "Pending",
    });

    res.json({ paymentSessionId, orderId });
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res.status(500).json({ message: "Error processing payment" });
  }
};

exports.getPaymentStatus = async (req, res) => {
  const paymentSessionId = req.params.paymentSessionId;

  try {
    const orderStatus = await getPaymentStatus(paymentSessionId);
    // Update payment status in the database
    const order = await Payment.findOne({ paymentSessionId });
    // Update the order's status
    order.paymentStatus = orderStatus;
    await order.save();

    res.json({ orderStatus });
  } catch (error) {
    console.error("Error fetching payment status:", error.message);
    res.status(500).json({ message: "Error fetching payment status" });
  }
};
