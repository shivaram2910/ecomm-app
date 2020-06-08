import React from 'react';
import './checkout.styles.scss';
import {connect } from 'react-redux';
import {selectCartItems,selectCartTotal} from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import  StripeCheckoutButtonfrom from '../../components/stripe-button/stripe-button.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const Checkoutpage =({cartItems,total})=>(
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div> 
            <div className='header-block'>
                <span>quantity</span>
            </div>
            <div className='header-block'>
                <span>price</span>
            </div>
            <div className='header-block'>
                <span>remove</span>
            </div>
        </div>
        
        {cartItems.map(cartItem => (<CheckoutItem key={cartItem.id} cartItem={cartItem}/>))}
        <div className='total'>${total}</div>
        <div className='test-warning'>
            *Please use the following credit card details for payment*
            <br />
            4242 4242 4242 4242 EXP:01/20 - CVV:123
        </div>
    <StripeCheckoutButton price={total}/>
    </div>
)
const mapStateToProps = createStructuredSelector({
    cartItems:selectCartItems,
    total:selectCartTotal
})
export default connect(mapStateToProps)(Checkoutpage);