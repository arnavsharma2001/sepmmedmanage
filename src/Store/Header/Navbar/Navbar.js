import React, { useState } from "react";
import "./Navbar.css";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import NavbarCart from "./NavbarComponents/NavbarCart";
import NavbarSignIn from "./NavbarComponents/NavbarSignIn";
import NavbarOrder from "./NavbarComponents/NavbarOrder";
import { useHistory } from "react-router-dom";
import { db, auth } from "../../../database/firebase";
import { useStateValue } from "../../../ContextApi/StateProvider";

const styleForButton = {
  fontSize: "30px",
};

const styleForIcon = {
  fontSize: "40px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "wrap",
};

const styleForArrow = {
  fontSize: "15px",
};




function MobileNavbar() {
  const history = useHistory();
  const [{ user, sidebarcontent }, dispatch] = useStateValue();
  const [sidebaropen, setsidebaropen] = useState(false);
  

  const toggleDrawer = (event, isopen) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setsidebaropen(isopen);
  };



  const orderhistorytoogle = () => {
    setsidebaropen(false);
    history.push("/Order");
  };



  const handleAuthetication = () => {
    if (user) {
      auth.signOut();
      dispatch({
        type: "ADD_ORDERS",
        item: [],
      });
    }else{
      history.push("/login");
    }
    setsidebaropen(false);
  };


  const catergorysearcher = (id) => {
    setsidebaropen(false);
    history.push(`/search?q=${id}`);
  };



  return (
    <div className="mobilehead">
      <div className="mobileheader">
        <div className="mobilenav">

            <div className="mobileslider">
                <button onClick={(e) => {toggleDrawer(e, true);}}><MenuIcon style={styleForButton} /></button>
                <Drawer anchor={"left"} open={sidebaropen} onClose={(e) => {toggleDrawer(e, false);}}>

                      <div className="MobileDrawerHeader">
                        <div><AccountCircleIcon style={styleForIcon} /></div>
                        <div classNme="DrawerheaderUser">{!user ? "Guest" : user.displayName}</div>
                      </div>

                      <div className="MobileDrawerlists">
                          <div className="MobileDrawerlist">
                            <h3>Shop By Category</h3>
                              {sidebarcontent?.map((d, i) => (
                                    <div key={i} onClick={(e) => catergorysearcher(d)} className="MobileDrawerlistItem">
                                          <div>{d}</div>
                                          <div><ArrowForwardIosIcon style={styleForArrow} /></div>
                                    </div>
                              ))}
                      </div>

                      <div className="MobileDrawerlist">
                        <h3>Help & Settings</h3>

                        <div  onClick={orderhistorytoogle}className="MobileDrawerlistItem">
                            <div>Orders</div>
                        </div>

                        <div onClick={handleAuthetication} className="MobileDrawerlistItem">
                            <div>{user? "Signout" : "SignIn"}</div>
                        </div>
                      </div>
                      </div>
              
                </Drawer>
          </div>
      
              <h1 onClick={e => history.push('/')}>MedManage</h1>
        </div>

        <div className="mobilenav">
          <NavbarSignIn />
          <NavbarOrder />
          <NavbarCart />
        </div>
      </div>

    </div>
  );
}

export default MobileNavbar;
