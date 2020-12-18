import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => { 

    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51HpxK1IbJYnQVMfm6pmP5rA8Mv4tbfuWgIiBQHXvbaOFGswb4RsJyUizyTsKTtfTYWK4E4QmIocyPTtqOuzfcOOe00GBJJmfoh';
    
    const onToken = token => {
        axios.post("payment",{
            body: {
                amount: priceForStripe,
                token
            }}).then(response => {
            alert('Payment Successfull')
        }).catch(error => {
            console.log('payment error ', error);
            alert('payment error please check you credit card info');

        })
    }
    return (
        <StripeCheckout label='Pay Now' 
        name='CRWN Clothing ltd' 
        billingAddress 
        shippingAddress 
        image='https://svgshare.com/i/CUz.svg' 
        description={`Your Total is $${price}`} 
        amount={priceForStripe}
        panelLabel='Pay Now' 
        token={onToken} 
        stripeKey={publishableKey}/>
    )

}

export default StripeCheckoutButton