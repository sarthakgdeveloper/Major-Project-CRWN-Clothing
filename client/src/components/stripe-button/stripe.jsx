import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { sendUsersOrders } from "../../firebase/firebase.utils";
import Axios from "axios";

const StripeCheckoutButton = ({ price, cartItems }) => {
  const [userOrders, setUserOrders] = useState(undefined);

  useEffect(() => {
    if (userOrders) {
      sendUsersOrders(userOrders);
    }
    return () => setUserOrders(undefined);
  }, [userOrders]);

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
        const {
          amount,
          source: {
            address_city,
            address_country,
            address_line1,
            address_zip,
            name,
          },
        } = response.data.success;
        setUserOrders({
          amount: amount / 100,
          address_city,
          address_country,
          address_line1,
          address_zip,
          name,
          order: [...cartItems],
        });
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
      currency="INR"
    />
  );
};
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(StripeCheckoutButton);
