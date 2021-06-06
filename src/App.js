import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Registration from './Login/Registration';
import {db, auth} from './database/firebase'
import { useStateValue } from './ContextApi/StateProvider';
import Store from './Store/Store';
import Header from './Store/Header/Header'
import ProductAdd from './ProductAdd/ProductAdd';
import firebase from 'firebase';
import Checkout from './Checkout/Checkout'
import OrderProduct from './OrderProduct/OrderProduct'
import Order from './Orders/Order'
import StoreSearch from './Store/StoreSearch';
import Home from './HomePage.js/Home';


function App() {

  const [{user}, dispatch] = useStateValue();
  const [cartuserproduct, setcartuserproduct] = useState([]);
  const [cartlocaldbproduct, setcartlocaldbproduct] = useState([]);
  const [addressstore, setaddressstore] = useState([]);
  const [order, setorder] = useState([]);
  
  const [sidebar, setsidebar] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

        if(authUser){
            dispatch({
                type: 'SET_USER',
                user: authUser
            })
        
        }else{
            dispatch({
                type: 'SET_USER',
                user: null
            })
        }
    })


    if(user === null)
        {   dispatch({
            type : 'ADD_CART',
            item : [],
            }) 
  
        }else{
            db.collection('Users').doc(`${user.email}`).collection('Cart').orderBy("timestamp", "desc").onSnapshot(snap=>{
                setcartuserproduct(snap.docs.map(doc => (doc.data()?.cartitem)))
            })

            dispatch({
                type : 'ADD_CART',
                item : [],
            }) 

            db.collection('Users').doc(`${user.email}`).collection('Address').orderBy("timestamp", "asc").onSnapshot(snap=>{
                setaddressstore(snap.docs.map(doc => ({ 
                    id : doc.id, 
                    data : doc.data()
                })))
            })

            db.collection('Users').doc(`${user.email}`).collection('Orders').orderBy("timestamp", "desc").onSnapshot(snap=>{
                setorder(snap.docs.map(doc => ({ 
                    id : doc.id, 
                    data : doc.data()
                })))
            })
        }

        db.collection('Admin').doc('AdminSidebar').onSnapshot( snap=>(
            setsidebar(snap.data().sidebar)
        )
        )
  }, [user])


  
  useEffect(() =>{
    if(user!==null)
    {
        const data = localStorage.getItem('cart');
        if(data !== null){
            setcartlocaldbproduct(JSON.parse(data));
            localStorage.clear();
        }

    }
 }, [user])


useEffect(() =>{
    if(user !== null && cartlocaldbproduct !== undefined && cartlocaldbproduct?.length >0)
    {
        cartlocaldbproduct?.map(d => {
            db.collection('Users').doc(`${user.email}`).collection('Cart').doc(`${d.productId}`).set({
                cartitem : d,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        })
    }
}, [cartlocaldbproduct])



  useEffect(() =>{
    if(user !== null && cartuserproduct !== undefined && cartuserproduct?.length >0)
    {
        dispatch({
            type : 'ADD_CART',
            item : cartuserproduct
        }) 
    }else{
        const data = localStorage.getItem('cart');
        if(data){
            dispatch({
                type : 'ADD_CART',
                item : JSON.parse(data)
            }) 
        } 
    }
}, [cartuserproduct])


useEffect(() =>{
    if(user !== null && addressstore !== undefined && addressstore?.length >0)
    {
        dispatch({
            type : 'ADD_ADDRESS',
            item : addressstore
        }) 
    }
}, [addressstore])


useEffect(() =>{
    if(user !== null && order !== undefined && order?.length >0)
    {
        dispatch({
            type : 'ADD_ORDERS',
            item : order
        }) 
    }
}, [order])

useEffect(() =>{
    if(sidebar !== null && sidebar !== undefined && sidebar?.length >0)
    {
        dispatch({
            type : 'ADD_SIDEBARCONTENT',
            item : sidebar
        }) 
    }
}, [sidebar])


  return (
    
    <Router>
        <div className="App">
        <Switch >
            <Route path="/Registration">
                <Registration />
            </Route>

            <Route path="/search">
                    <Header />
                    <StoreSearch />
            </Route>

          
            <Route path="/order">
                    <Header />
                    <Order />
            </Route>

            <Route path="/payment">
                    <OrderProduct />
            </Route>

            <Route path="/Cart">
                <Header />
                <Checkout />
            </Route>

            <Route path="/ProductAdd">
                <ProductAdd />
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/Store">
                <Header />
                <Store />
            </Route>
        
            <Route  path="/">
              <Home/>
            </Route>
        
        </Switch>
            
        </div>
      </Router>
  
  );
}

export default App;
