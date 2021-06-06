import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../ContextApi/StateProvider';
import { getCartItemTotal, getCartTotal } from '../../ContextApi/Reducer';

function Subtotal() {

    const [{ cart, user }, dispatch ] = useStateValue();
    const history = useHistory();

    return (
        <div className="subtotal">
            <CurrencyFormat
                    renderText={(value) => (
                            <>
                                <p>
                                    Subtotal ({getCartItemTotal(cart)}: items): <strong>{value}</strong>
                                </p>

                                <small className="subtotal__gift">
                                    <input type="checkbox" /> This order contains a gift
                                </small>
                            </>
                    )}
                    value={getCartTotal(cart)}
                    displayType={"text"}
                    thousandSeparator={true}
                    thousandSpacing = '2s'
                    prefix={"Rs"}
            />

    <button onClick={e =>{ if(user && cart.length>0){history.push('/payment')}
                            else if (!user) {history.push('/login')}} }>Proceed to Checkout</button>
    </div>
    )
}

export default Subtotal

