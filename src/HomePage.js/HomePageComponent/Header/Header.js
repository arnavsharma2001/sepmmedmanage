import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './MainHeader.css'

function Header() {
    const history = useHistory();

    return (
        <div className="Mainheader">
            <div className="MainheaderComponent">
                MADMANAGE
            </div>
            <div className="MainheaderComponent">
               <div className="MainheadersubComponent" onClick={e => history.push('/')}>
                    Home
               </div>
               <div className="MainheadersubComponent" onClick={e => history.push('/store')}>
                    Shop
               </div>
               
              
               <div className="MainheadersubComponent" onClick={e => history.push('/login')}>
                    Login
               </div>
              
            </div>
        </div>
    )
}

export default Header
