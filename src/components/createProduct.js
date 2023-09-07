import React, {useState, useEffect} from "react";
import FormList from "./utilities/list";
import { TextField, Button } from "@mui/material";
import './utilities/signUpForm.css';
import { useAuth } from './utilities/AuthContext';
import { useNavigate } from "react-router-dom";



const CreateProduct = () => {
  const navigate = useNavigate()
  const { 
    currentShopData, 
    token, 
    isLoggedIn,
    shopData, 
    updateAuth, 
    userData,
    handleMsgCollector, 
    messageShower,
    baseUrl
  } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        productOverview: '',
        commision: '',
        discount: '',
        deliveryFee: '',
        quantity: '',
        price: '',
      });
      const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: value 
      }))}

    
        const returnPolicyList = [
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
    const [returnPolicy, setReturnPolicy] = useState('')
    const [productType, setProductType] = useState('')
       
    const handleListValue = (value) => {
        setReturnPolicy(value)
    }
    const handleTypeListValue = (value) => {
        setProductType(value)
    }
    const [image, setImage] = useState(null);

    
    const handleImgFileChange = (event) => {
      event.preventDefault()
      const file = event.target.files[0];
      setImage(file);
    };
    const [Success, setSuccess] = useState(null)
    const [Error, setError] = useState(null)
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        messageShower(true)
        const form = new FormData();
        const finalFormData = {
          ...formData,
          returnPolicy: returnPolicy,
          productType: productType,
          shopId: currentShopData._id,
          
        }

        form.append("image", image);
        if(!image){
          setError('please select a good image to display your product')
        }else if(!returnPolicy){
          setError('please specify a policy for your products')
        }else if(!productType){
          setError('please specify your product type')
        }else{
          
          let response
          try {
            response = await fetch(baseUrl('products'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(finalFormData),
          });
    
          if (response.ok) {
            const data = await response.json()
            try{
              const responseImg = await fetch(baseUrl(`products/${data.product._id}`), {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${token}`
              },
              body: form,
            })
            if(responseImg.ok){
              setError(null);
              setSuccess('your product was added successfully');
              navigate('/MyPshop'); 
            }
          } catch(err){
              setError(err.message)
            }
          }
        } catch (error) {
          setError('something went wrong, refresh the page and try again')
        }
      }
      
   }
   useEffect(() => {
    handleMsgCollector(Error, Success);
  }, [Error, Success]);

  
    return ( 
    <>
    <div className="create-shop-container">
        <div className="create-shop-form">
          <h2>Add a product to {currentShopData?.name}</h2>
          <form onSubmit={handleSubmit}>
    <TextField
         label="product name"
         name="name"
        value={formData.name}
        onChange={handleChange}
        required
    />
    <TextField
         label="Price in your currency"
         name="price"
         type="Number"
        value={formData.price}
        onChange={handleChange}
        required
    />
    <TextField
         label="Quantity"
         name="quantity"
         type="Number"
        value={formData.quantity}
        onChange={handleChange}
        required
    />
    <TextField
         label="Delivery fee per kilometer"
         name="deliveryFee"
         type="Number"
        value={formData.deliveryFee}
        onChange={handleChange}
        required
    />
    <TextField
         label="Discount percentage"
         name="discount"
         type="Number"
        value={formData.discount}
        onChange={handleChange}
    />
     <TextField
         label="Affiliate commision"
         name="commision"
         type="Number"
        value={formData.commision}
        onChange={handleChange}
    />
    <FormList items={returnPolicyList} listCaption={'Return policy'} handleListValue={handleListValue}/>
    <FormList items={['digital product', 'physical product']} listCaption={'product type'} handleListValue={handleTypeListValue}/>
    <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '20px 10px',

          }} type='button'>
        <label htmlFor="image" className="m-0 w-100">
            <input
              accept={'img/*'}
              style={{ display: 'none' }}
              id="image"
              name="image"
              type="file"
              onChange={handleImgFileChange}
            />
             {!image ? 'insert the product image' : `${image.name} selected`}
          </label>
        </button>
    
    
        <label>
        Describe this product specification
        <textarea
            name="productOverview"
            type="text"
            value={formData.productOverview}
            onChange={handleChange}
            style={{
            width: '100%',
            height: '150px',
            fontSize: '16px'
            }}
            required
        />
        </label>
    <Button type="submit" variant="Button" color="primary">
          Add product
        </Button>
     </form>
        </div>
      </div>
    
    </> 
    );
}

 
export default CreateProduct;