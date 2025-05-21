import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";

const CheckOutForm = () => {
  const [error, setError] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const { user } = useAuth();
  const [transactionId, setTransactionId] = useState("");
  //   payment er jonno
  // useEffect(() => {
  //   const res = axiosSecure
  //     .post("/create-payment-intent", { price: totalPrice })
  //     .then((res) => {
  //       console.log(totalPrice)
  //       console.log(res.data.clientSecret);
  //       setClientSecret(res.data.clientSecret);
  //     });
  // }, [axiosSecure, totalPrice]);

  useEffect(() => {
    if (totalPrice <= 0) return; // 🔒 Prevent calling with 0

    const priceInCents = Math.round(totalPrice * 100);
    console.log("Sending payment intent request with price:", priceInCents);

    axiosSecure
      .post("/create-payment-intent", { price: priceInCents })
      .then((res) => {
        console.log("Client secret received:", res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error(
          "Error creating payment intent:",
          error.response?.data || error.message
        );
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      setError("");
      console.log("Payment method", paymentMethod);
    }

    // confirsm payment
    const { paymentIntent, error: cardConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user.displayName || "anonymous",
          },
        },
      });
    if (cardConfirmError) {
      console.log("confirm Error");
    } else {
      console.log("Payment intent", paymentIntent);
      console.log(paymentIntent.status);
      if (paymentIntent.status === "succeeded") {
        console.log("Transaction id :", paymentIntent.id);
        setTransactionId(paymentIntent.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#4242770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-rose-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction Id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
