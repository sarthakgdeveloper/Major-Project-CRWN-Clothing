import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HpxK1IbJYnQVMfm6pmP5rA8Mv4tbfuWgIiBQHXvbaOFGswb4RsJyUizyTsKTtfTYWK4E4QmIocyPTtqOuzfcOOe00GBJJmfoh";

  const onToken = (token) => {
    Axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
        description: "testing",
      },
    })
      .then((response) => {
        alert("succesful payment");
      })
      .catch((error) => {
        console.log("Payment Error: ", error.response.data);
        alert(
          "There was an issue with your payment! Please make sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Mutka Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ₹${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
