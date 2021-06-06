import React from 'react'
import './PageContent.css'
import aboutusing from './AbouUs.jpeg';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import RoomIcon from '@material-ui/icons/Room';
import { useHistory } from 'react-router';

function PageContent() {
    const history = useHistory();
    return (
        <div classname="pageContent">
            <div className="pageContentMain">
                <div className="pageContentMainComponent">
                    <div>GET Your Medicines at Your Home</div>
                    <div classname="pageContentbuttonAssemble">
                        <button className="btn" onClick={e => history.push('/login')}>Login</button>
                        <button className="btn" onClick={e => history.push('/store')}>Shop</button>
                    </div>
                </div>
            </div>
            <div className="pageContentAboutus">
                <div className="pageContentImage">
                    <img src={aboutusing} alt="aboutusimage"/>
                </div>
                <div className="pageContentaboutContent">
                    <h1>Know About Us</h1>
                    <p>We Help In managing of Your Pharmacy</p>
                    <p>We Help In managing of Your Pharmacy</p>
                    <p>We Help In managing of Your Pharmacy</p>
                </div>
            </div>

            <div className="pageContentServices">
                <div className="pageContentSevrivestitle">
                    <h1>SERVICES</h1>
                    <p>We Offer Services that make you manage your pharmacy easier.</p>
                </div>
                <div>
                    <div className="pageContentServicesLAbel">
                        <div className="pageContentServicesComponent">
                            <h1>Drug Managment System</h1>
                        </div>
                        <div className="pageContentServicesComponent">
                            <h1>Only the Best Stock</h1>
                        </div>
                    </div>

                    <div className="pageContentServicesLAbel">
                        <div className="pageContentServicesComponent">
                            <h1>Over Thousands+ Medicines</h1>
                        </div>
                        <div className="pageContentServicesComponent">
                            <h1>24 x 7 Support </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pageContentContactUs">
                <div className="pageContentContactUsTitle">
                       <h1>CONTACT US</h1>
                </div>  
                <div className="pageContentContactUsComponent">
                   <div className="pageContentContactUsSubComponent">
                         <RoomIcon />
                        <h2>Address</h2>
                        <h3>SRM University 603203</h3>
                   </div>
                   <div className="pageContentContactUsSubComponent">
                        <PhoneIcon />
                        <h2>Phone number</h2>
                        <h3>+91 0987654321</h3>
                   </div>
                   <div className="pageContentContactUsSubComponent">
                        <EmailIcon  />
                         <h2>Email</h2>
                         <h3>info@medmanage.com</h3>
                   </div>
                </div>
            </div>
            
        </div>
    )
}

export default PageContent
