import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../../../ContextApi/StateProvider';
import { getCartItemTotal } from '../../../../ContextApi/Reducer';

function NavbarCart() {
    const history = useHistory();
    const [{cart}] = useStateValue();

    return (
            
            <div className="header__optionCart" onClick={e => history.push('/Cart')}>
                <ShoppingCartIcon />
                <span className="header__optionLineTwo header__CartCount">{getCartItemTotal(cart)}</span>
            </div>
            
    )
}

export default NavbarCart
