import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { useStateValue } from '../ContextApi/StateProvider';
import queryString from 'query-string';
import {db} from '../database/firebase';
import StoreProduct from './StoreProduct';


function StoreSearch() {
    const [product, setproduct] = useState([]);
    const [{user}] = useStateValue();
    let location = useLocation();
    const parsed = queryString.parse(location.search);

    useEffect(() =>{
        setproduct([])
        
            db?.collection('product')?.orderBy("timestamp", "desc")?.onSnapshot(snap => {
                snap.docs.map(doc => {
                    if(doc.data().cateogry?.toLowerCase().includes(parsed.q?.toLowerCase())){
                        setproduct(product => [...product,{
                            id : doc.id,
                            data : doc.data(),
                        }])
                    }
                })
            })
        
    }, [user, location])


    return (
        <div className="store">
            {product?.map((d,i) => (
                <StoreProduct key={i} id={d.id} data={d.data} />
            )
            )}
            
        </div>
    )
}

export default StoreSearch
