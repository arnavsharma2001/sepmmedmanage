import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import './StoreProduct.css';
import {db} from '../database/firebase';
import { useStateValue } from '../ContextApi/StateProvider';
import firebase from 'firebase';

function StoreProduct({id,data}) {
    const [{user, cart}, dispatch] = useStateValue();
    const [quant, setquant] = useState(1);
    const [allowdbcart, setallowdbcart] = useState(false)
    const [localupdated, setlocalupdated] = useState(false);

    

    const addtocart = (e) =>{
        if(user === null || user === undefined)
        {   
            
            if(cart !==null && cart!==undefined && cart?.length>0)
            {   {cart?.map((d,i) => {
                    if(d.productId === id){
                        cart[i].productQuantity = cart[i].productQuantity +1;
                        localStorage.setItem('cart', JSON.stringify(cart))
                    }

                    else{
                        localStorage.setItem('cart', JSON.stringify([...cart , {
                            productId : id,
                            productTitle: data?.productTitlee,
                            productImage : data?.imageUrl,
                            productPrice : data?.productPrice,
                            productQuantity : 1,
                        }]));
                    }

                })}
                
            }


            else
            { 
                localStorage.setItem('cart', JSON.stringify([{
                    productId : id,
                    productTitle: data?.productTitlee,
                    productImage : data?.imageUrl,
                    productPrice : data?.productPrice,
                    productQuantity : 1,
                }]));
            }
            setlocalupdated(true);
        }


        else{
            if(cart!==null &&  cart.length >0){
                {cart?.map((d,i) =>{
                    if(d.productId === id){
                        setquant(cart[i].productQuantity +1);
                        setallowdbcart(true);
                    }else{
                        setallowdbcart(true);
                    }
                })}
            }
            
            else{
                setallowdbcart(true);
            }
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



    useEffect(()=>{
        if(allowdbcart === true && user !== null){
                db.collection('Users').doc(`${user.email}`).collection('Cart').doc(`${id}`).set({
                    cartitem : {productId : id,
                                productTitle: data?.productTitle,
                                productImage : data?.imageUrl,
                                productPrice : data?.productPrice,
                                productQuantity : quant,
                            },
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                setquant(1);
                setallowdbcart(false);
        }
        }, [allowdbcart])

        
    


    return (
        <div className="StoreProduct">
            <img src={data?.imageUrl} alt="productImage"/>
            <div className="storeProduct__title">
                <p>{data?.productTitle}</p>
                <div className="storeProduct__price">
                <p><small>Rs.</small><strong>{data?.productPrice}</strong></p>
                </div>
            </div>
            <div className="storeProduct__button">
            <Button fullWidth variant="contained" color="primary" onClick={e => addtocart(e,0)}>Add to Cart</Button>
            </div>
        </div>
    )
}

export default StoreProduct
