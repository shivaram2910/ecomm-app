import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton =({price}) =>{

    const priceForStripe = price * 100;
    const pusblishablekey=	
    'pk_test_51GrnmtKCXDqxyGUBZvPQ1IKqLwyMvGaXkAYionO6LmjZulZ8HJHKhdPi0NkX1azuqVCeNYFKBSQXom5pjtVAIkrE007QnEx5hC';

    const onToken =token=>{
        console.log(token);
        alert('your payment is successfull');
    }


    return(
        <StripeCheckout
        label='Pay Now'
        name='ECOMM_APP'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={pusblishablekey}
        
        />
    )

}

export default StripeCheckoutButton;