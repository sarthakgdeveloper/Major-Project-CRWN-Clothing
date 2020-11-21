import React from 'react';

import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
    const onToken = token => {
        alert('Payment Successfull')
    }
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51HpxK1IbJYnQVMfm6pmP5rA8Mv4tbfuWgIiBQHXvbaOFGswb4RsJyUizyTsKTtfTYWK4E4QmIocyPTtqOuzfcOOe00GBJJmfoh';
    return (
        <StripeCheckout label='Pay Now' name='CRWN Clothing ltd' billingAddress shippingAddress image='https://svgshare.com/i/CUz.svg' description={`Your Total is $${price}`} amount={priceForStripe}
        panelLabel='Pay Now' token={onToken} stripeKey={publishableKey}/>
    )

}

export default StripeCheckoutButton