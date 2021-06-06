import React, { useEffect, useState } from 'react';
import { useStateValue } from '../ContextApi/StateProvider';

import CheckoutProduct from './CartItem/CheckoutProduct';
import './Checkout.css';
import Subtotal from './Subtotal/Subtotal';
import checkoutimg from './Checkout.jpeg'


function Checkout({width}) {

    const [{ cart, user }, dispatch] = useStateValue();
   
    console.log(cart)

    cart?.map(d =>{
        console.log(d.sellerName)
    })
    return (

        <div >
            <div className="checkout">
                
                <div className="checkout__left">
                    <img className="checkout__ad"
                        src={checkoutimg }
                        alt="CheckoutImage"
                    />
                    
                    <h2 className="checkout__title">Your Cart Items</h2>
                        
                    
                    {cart.map((item,index) => (
                    <CheckoutProduct 
                    key={index}
                    index ={index}
                    data={item}
                    />
                    )
                    )}
                    
                </div>
                <div className="checkout__right">
                    <Subtotal />
                </div>
            </div>
        </div>

       
    )
}

export default Checkout
