import React, {useState, useEffect} from "react";
import FormList from "./utilities/list";
import { TextField, Button } from "@mui/material";
import './utilities/signUpForm.css';
import { useAuth } from './utilities/AuthContext';
import { useNavigate } from "react-router-dom";



const CreateProduct = ({ handleMsgCollector, messageShower }) => {
  const navigate = useNavigate()
  const { currentShopData, token, isLoggedIn,shopData, updateAuth, userData } = useAuth()
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
      const file = event.target.files[0];
      setImage(file);
    };
    const [Success, setSuccess] = useState(null)
    const [Error, setError] = useState(null)
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append("name", formData.name);
        form.append("productOverview", formData.productOverview);
        form.append("productType", productType);
        form.append("deliveryFee", formData.deliveryFee);
        form.append("returnPolicy", returnPolicy);
        form.append("commision", formData.commision);
        form.append("price", formData.price);
        form.append("quantity", formData.quantity);
        form.append("shopId", currentShopData._id);
        form.append("discount", formData.discount);
        form.append("location", currentShopData.location);
        form.append("email", currentShopData.email);
        form.append("shopName", currentShopData.name);
        form.append("image", image);
        if(!image){
          setError('please select a good image to display your product')
        }
        if(!returnPolicy){
          setError('please specify a return policy for your products')
        }
        if(!productType){
          setError('please specify a your product type')
        }
        let response
        try {
          response = await fetch("http://localhost:8000/api/v1/products/", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: form,
        });
  
        if (response.ok) {
          setError(null);
          setSuccess('your product was added successfully');  
          const data = await response.json();
          updateAuth(userData, isLoggedIn, token, currentShopData)
          setTimeout(() => {
            navigate('/MyPshop'); 
          }, 2000); 

        }
      } catch (error) {
        setError('something went wrong, refresh the page and try again')
      }
    
    messageShower(true)
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

          }}>
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