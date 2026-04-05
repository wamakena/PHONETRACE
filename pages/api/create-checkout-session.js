import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { plan } = req.body;
  const priceId = plan === "premium" ? process.env.STRIPE_PREMIUM_PRICE_ID : null;
  if (!priceId) return res.status(400).json({ error: "Invalid plan" });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${req.headers.origin}/dashboard?success=true`,
      cancel_url: `${req.headers.origin}/dashboard?canceled=true`,
    });
    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
