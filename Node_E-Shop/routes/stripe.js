const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51K1VS2IjqPb8FkRvOEh2wsJ91lxQSlWCESSdU7PGo5gtNKOGsF8OPA2PdIBtUExRPWrSLwSEgPE0UObRgbrcnDyj009s6jZG46"
);

//POST stripe
router.post("/checkout", async (req, res) => {
  console.log("Request: ", req.body);

  let error;
  let status;
  try {
    const { products, token, total } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: "Purchased products",
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    });
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.log("Error", error);
    status = "failure";
  }
  res.json({ error, status });
});
module.exports = router;
