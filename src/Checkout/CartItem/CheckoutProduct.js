import React, { useEffect, useState } from 'react';
import './CheckoutProduct.css';
import {db} from '../../database/firebase';
import firebase from 'firebase'
import { useStateValue } from '../../ContextApi/StateProvider';

function CheckoutProduct({index,data}) {

    const [{cart, user}, dispatch] = useStateValue();
    const [localupdated, setlocalupdated] = useState(false);
    
    console.log("data", data)
    
    const increasefromcart = () =>{
        if(user !== null){
            db.collection('Users').doc(`${user.email}`).collection('Cart').doc(`${data?.productId}`).set({
                cartitem : {productId : data?.productId,
                    productTitle: data?.productTitle,
                    productImage : data?.productImage,
                    productPrice : data?.productPrice,
                    productQuantity : data?.productQuantity +1,
                },
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            
        } else{
            cart[index].productQuantity = data?.productQuantity +1;
            localStorage.setItem('cart', JSON.stringify(cart))
            setlocalupdated(true)
        }
    }

    const decreaseFromCart = () =>{
        if(user !== null){
            if(data?.productQuantity -1 > 0)
            {
                db.collection('Users').doc(`${user.email}`).collection('Cart').doc(`${data?.productId}`).set({
                    cartitem : {productId : data?.productId,
                                productTitle: data?.productTitle,
                                productImage : data?.productImage,
                                productPrice : data?.productPrice,
                                productQuantity : data?.productQuantity -1,
                    },
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            } else{
                cart.splice(index, 1);
                db.collection('Users').doc(`${user?.email}`).collection('Cart').doc(`${data?.productId}`).delete();
            }
        } else{
            if(data?.productQuantity -1 >0)
            {
            cart[index].productQuantity= data?.productQuantity - 1;
            localStorage.setItem('cart', JSON.stringify(cart))
            setlocalupdated(true)
            }
            else{
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart))
                setlocalupdated(true)
            }
        }
    }

    const removeFromCart = () => {

            if(user !==null){
                cart.splice(index, 1)
                db.collection('Users').doc(`${user?.email}`).collection('Cart').doc(`${data?.productId}`).delete();
            }else{
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart))
                setlocalupdated(true)
            }
            
    }
    
    useEffect(() =>{
        if(localupdated && user === null)
        {
            const data = localStorage.getItem('cart');
            if(data){
                dispatch({
                    type : 'ADD_CART',
                    item : JSON.parse(data)
                }) 
            }
            setlocalupdated(false);
        }
    }, [localupdated])


    return (
        <div className="checkoutProduct">
            <img className="CheckoutProduct__image" src={data?.productImage} alt="CheckoutProductImage"/>
            <div className="checkoutProduct__info">
                <div className="CheckoutProduct__title">{data?.producctTitle}</div>
                <div className="CheckoutProduct__price">
                    <small>Rs.</small>
                    <strong>{data?.productPrice}</strong>
                </div>
                <button  onClick={removeFromCart}>Remove from Cart</button>
                <div>
                <button onClick={increasefromcart}>+</button>
                <input type="text" value={data?.productQuantity} disabled/>
                <button onClick={decreaseFromCart}>-</button>
                </div>
            </div>

        </div>
    )
}

export default CheckoutProduct

