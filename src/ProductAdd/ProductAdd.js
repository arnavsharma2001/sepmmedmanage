import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './ProductAdd.css';
import {db, storage} from '../database/firebase'
import firebase from 'firebase'
import { InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { useStateValue } from '../ContextApi/StateProvider';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

function ProductAdd() {
    const classes = useStyles();
    const [image,setImage] = useState(null);
    const [fileimage, setfileimage] = useState(null)
    const [progress, setProgress] = useState(0);
    const [{sidebarcontent}] = useStateValue();
    
    const [addproduct, setaddproduct] = useState({
        productId : '',
        productTitle : '',
        productPrice : 0,
        category : ''
    });
    
    const[{user}] = useStateValue();

    const inputChange = (e) =>{
        const {name, value} = e.target;
        setaddproduct({
            ...addproduct,
            [name] : value
        })
    }


    const handleChangeImage = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            setfileimage(URL.createObjectURL(e.target.files[0]))
        }
    };
    

    const onSubmit = (e) =>{
        e.preventDefault();
        const uploadTask = storage.ref(`images/${addproduct.productId}/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100
                );
                setProgress(progress);
            },
            (error) =>{
                //Error Function 
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage.ref(`images/${addproduct.productId}`).child(image.name).getDownloadURL()
                .then(url => {
                    //post image inside the database
                    db.collection("product").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        productId : addproduct.productId,
                        productTitle : addproduct.productTitle,
                        productPrice : addproduct.productPrice,
                        cateogry : addproduct.category,
                        imageUrl : url,
                    });


                    db.collection("Manufacturer").doc(`${user?.email}`).collection('Product').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        productId : addproduct.productId,
                        productTitle : addproduct.productTitle,
                        productPrice : addproduct.productPrice,
                        cateogry : addproduct.category,
                        imageUrl : url,
                    });



                    setProgress(0);
                    setaddproduct({
                        productId : '',
                        productTitle : '',
                        productPrice : 0,
                    })
                    setImage(null);
                    setfileimage(null);
                });
            }
        );
    };
    
    console.log(addproduct)
    return (
        <div className="Addproduct">
            <form onSubmit={onSubmit}>
                <div className="addproduct1">

                <div className="AddproductCompnent1">
                    <div className="Addproductsubcomponent">
                        <TextField id="outlined-basic" label="product Id" variant="outlined" fullWidth name="productId"
                            value={addproduct.productId} onChange={inputChange}/>
                    </div>

                    <div className="Addproductsubcomponent">
                        <TextField id="outlined-basic" label="product Title" variant="outlined" fullWidth name="productTitle"
                        value={addproduct.productTitle} onChange={inputChange}/>
                    </div>

                    <div className="Addproductsubcomponent">
                        <TextField id="outlined-basic" label="product Price" variant="outlined" fullWidth type="number" name="productPrice"
                        value={addproduct.productPrice} onChange={inputChange}/>
                    </div>

                    <div className="Addproductsubcomponent">
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select"
                                name="category" value={addproduct.category} onChange={e => inputChange(e)} fullWidth >
                                    {sidebarcontent?.map((d,i) =>(
                                            <MenuItem  value={d} key={i}>{d}</MenuItem>
                                    ))}
                        </Select>
                    </div>
                
                </div>

                <div className="AddproductCompnent2">
                <div className="imageupload">
                    <div className="displayImage">
                    {fileimage!==null ? (<img src={fileimage} />) : (<div>Add Images</div>)}
                    </div>
                    <input type="file" className={classes.input} id="contained-button-file"   onChange={handleChangeImage}/>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                    Upload
                            </Button>
                        </label>
                </div>
                </div>
                </div>
                
                <div className="AddButton">
                <Button variant="contained" color="primary" type="submit">Add Product</Button>
                </div>
            </form>
        </div>
    )
}

export default ProductAdd
