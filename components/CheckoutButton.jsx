import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ plan }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const { sessionId } = await res.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  return <button className="button" onClick={handleClick}>Upgrade to {plan}</button>;
};

export default CheckoutButton;
