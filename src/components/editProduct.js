import React, { useState, useEffect } from 'react';
import './utilities/editProduct.css';
import { useAuth } from './utilities/AuthContext';
import { TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const EditProduct = () => {
    const { currentProductData, token, baseUrl, messageShower, handleMsgCollector } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
      const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        commision: '',
        productOverview: '',
        discount: '',
        deliveryFee: '',
        returnPolicy: '',
        quantity: '',
      });
      const returnPolicy = [
        'No guarantee',
        '5-day guarantee',
        '10-day guarantee',
        '15-day guarantee',
        '30-day guarantee',
        '2months guarantee',
        '3months guarantee',
        '6months guarantee',
        '1-year guarantee',
        '2-year guarantee',
        '5-year guarantee',
      ]
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const [isEditing, setIsEditing] = useState(false)
    const [selectedImgFile, setSelectedImgFile] = useState(null);

       
       const handleImgFileChange = (event) => {
         const file = event.target.files[0];
         setSelectedImgFile(file);
       };
     const handleUpdate = async(event) => {
       event.preventDefault()
        messageShower(true)
        const form = new FormData();

        if (selectedImgFile) {
          form.append("image", selectedImgFile);
        }
        if(formData.returnPolicy && !returnPolicy.includes(formData.returnPolicy)){
          setSuccess(null)
          setError(`allowed values for return policy are ${{...returnPolicy}}`)
          return;
        }
      const nonImageFields = {
        ...formData,
      };
          let response
        try {
          response = await fetch(baseUrl(`products/details/${currentProductData._id}`), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(nonImageFields),
        });
            
        if (response.ok) {
            setSuccess('your product has been successfully updated, changes will take effect when u navigate to dashboard')
        const data = await response.json()
        localStorage.setItem('currentProductData', JSON.stringify(data.productData))
        setIsEditing(!isEditing)
        if(selectedImgFile){
       try{
        const responseImg = await fetch(baseUrl(`products/${currentProductData._id}`), {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form,
      });
      if(responseImg.ok){
              setError(null);
              setSuccess('your product was updated successfully, changes will take effect when u navigate to dashboard');  
              
      }} catch(err){
        setError(err.message)
        }
        }          
      }
    } catch (error) {
      setError(await response?.json()?.errormessage)
    }
    }
    useEffect(() => {
        handleMsgCollector(error, success);
      }, [error, success]);
    return ( <>
    <div className="edit-shop-wrrapper">
        <div className="edit-shop-button-wrrapper">
            <Typography variant="h3">Edit {currentProductData.name}</Typography>
            <div className="edit-buttons">
            {!isEditing ? <button 
            type="button" 
            onClick={() => {
                setIsEditing(!isEditing)
            }}
            className="save-button"
            >edit product </button>
            :
            <button 
            type="button" 
            onClick={(event) => {
                handleUpdate(event)
            }}
            className="save-button"
            >save changes</button>
        }
            </div>
        </div>
    <div className="edit-shop-items">
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Product Name</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.name} 
            label={`${currentProductData.name || 'Non specified'}`}
            name="name"
            />
            </div> : <Typography variant="h4">{currentProductData.name || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Price</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.price} 
            label= {`${currentProductData.currencySymbol}${currentProductData.price || 'Non specified'}`}
            name="price"
            type='Number'
            />
            </div> : <Typography variant="h4">{currentProductData.currencySymbol+currentProductData.price || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Affiliate Commision</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.commision} 
            label={`${currentProductData.commision + '%' || 'Non specified'}`}
            name="commision"
            type='Number'
            />
            </div> : <Typography variant="h4">{currentProductData.commision + '%' || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Product Description</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.productOverview} 
            label={`${currentProductData.productOverview || 'Non specified'}`}
            name="productOverview"
            />
            </div> : <Typography 
            variant="h4"
            sx={{
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                width: '100%'
            }}
            >{currentProductData.productOverview || 'Non specified'}
    
            </Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Discount</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.discount} 
            label={`${currentProductData.discount+'%' || 'Non specified'}`}
            name="discount"
            type='Number'
            />
            </div> : <Typography variant="h4">{currentProductData.discount+'%' || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Delivery Fee Per Kilometer</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.deliveryFee} 
            label={`${currentProductData.currencySymbol+currentProductData.deliveryFee || 'Non specified'}`}
            name="deliveryFee"
            type='Number'
            />
            </div> : <Typography variant="h4">{currentProductData.currencySymbol+currentProductData.deliveryFee || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Return Policy</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.returnPolicy} 
            label={`${currentProductData.returnPolicy || 'Non specified'}`}
            name="returnPolicy"
            />
            </div> : <Typography variant="h4">{currentProductData.returnPolicy || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Quantity</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.quantity} 
            label={`${currentProductData.quantity || 'Non specified'}`}
            name="quantity"
            type='Number'
            />
            </div> : <Typography variant="h4">{currentProductData.quantity || 'Non specified'}</Typography> }
        </div>
        {isEditing ? <div className="edit-shop-content">
         <div className="edit-shop-caption">
                <Typography variant="h4">Product Image</Typography>
            </div >
             <div className="edit-shop-details">
            <button style={{ 
            border: '1px solid #333333b0', 
            background: '#fff', 
            color: '#333333b0',
            textAlign: 'left',
            padding: '10px 14px',

          }} type="button">
        <label htmlFor="Img-file-input">
            <input
              accept={'image/*'}
              style={{ display: 'none' }}
              id="Img-file-input"
              type="file"
              onChange={handleImgFileChange}
            />
             {!selectedImgFile ? 'select your shop profile image' : `${selectedImgFile.name} selected`}
          </label>
        </button>
            </div> 
        </div> : '' }
    </div>
    
    
    </div>
</>);
}
 
export default EditProduct;