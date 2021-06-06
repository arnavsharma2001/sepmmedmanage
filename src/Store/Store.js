import React, { useEffect, useState } from 'react'
import StoreProduct from './StoreProduct';
import './Store.css'
import {db} from '../database/firebase'
import { useStateValue } from '../ContextApi/StateProvider';

function Store() {
    const [product, setproduct] = useState([]);
    const [{user}] = useStateValue();

    useEffect(() =>{
        setproduct([])
            db?.collection('product')?.orderBy("timestamp", "desc")?.onSnapshot(snap => {
                setproduct(snap.docs.map(d => ({
                    id : d.id,
                    data : d.data()
                })))
            })
            
    }, [user])

    


    return (
        <div className="store">
            {product.map((d,i) => (
                <StoreProduct key={i} id={d.id} data={d.data} />
            )
            )}
            
        </div>
    )
}

export default Store
