import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();

  const { product, quantity, shippingAddress, phoneNumber, user } =
    location.state || {};

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = product?.price * quantity;

  
  useEffect(() => {
    if (totalPrice > 0) {
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, _paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Unknown User",
            email: user?.email || "unknown@example.com",
          },
        },
      });

    if (confirmError) {
      Swal.fire("Error", confirmError.message, "error");
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Payment succeeded → save order
      const orderItem = {
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        totalPrice,
        address: shippingAddress,
        phone: phoneNumber,
        paymentMethod: "Online Payment",
        paymentStatus: "paid",
        deliveryStatus: "processing",
        createdAt: new Date(),
      };

      fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire("Payment Successful!", "Your order has been placed.", "success");
            
          } else {
            Swal.fire("Error", "Order save failed!", "error");
          }
        })
        .catch(() => Swal.fire("Error", "Payment processed, but order save failed!", "error"))
        .finally(() => setProcessing(false));
    }
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-600">
          No product selected for payment.
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-300 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-16 bg-white shadow-lg rounded-xl p-6 border">
      <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">
        Secure Payment
      </h2>

      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-800 mb-1">{product.title}</h3>
        <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
        <p className="text-gray-700 font-semibold mt-2">
          Total: ${totalPrice}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border p-3 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className={`w-full py-2 mt-2 rounded text-white font-semibold transition ${
            processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {processing ? "Processing..." : `Pay $${totalPrice}`}
        </button>
      </form>
    </div>
  );
};

export default Payment;
