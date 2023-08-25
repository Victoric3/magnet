import React, {useState} from "react";
import FormList from "./utilities/list";
import { TextField, Button } from "@mui/material";
import './utilities/signUpForm.css'


const CreateProduct = () => {

    const [formData, setFormData] = useState({
        productName: '',
        overview: '',
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
          [name]: value,
        }))}

    
        const returnPolicyList = [
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
       
    const handleListValue = (value) => {
        setReturnPolicy(value)
    }
    const [selectedImgFile, setSelectedImgFile] = useState(null);
    const [selectedBannerFile, setSelectedBannerFile] = useState(null);

    
    const handleImgFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedImgFile(file);
    };
    const handleBannerFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedBannerFile(file);
    };
    const formData2 = {
        background: selectedBannerFile,
        productImage: selectedImgFile,
        returnPolicy: returnPolicy,
    }
    const finalFormData = {...formData, ...formData2}
    const handleSubmit = () => {
        
    }
    return ( 
    <>
    <div className="create-shop-container">
        <div className="create-shop-form">
          <h2>Add product</h2>
          <form>
    <TextField
         label="product name"
         name="productName"
        value={formData.productName}
        onChange={handleChange}
        required
    />
    <TextField
         label="Price"
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
    <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '20px 10px',

          }}>
        <label htmlFor="Img-file-input" className="m-0 w-100">
            <input
              accept={'img/*'}
              style={{ display: 'none' }}
              id="Img-file-input"
              type="file"
              onChange={handleImgFileChange}
            />
             {!selectedImgFile ? 'insert the image/cover' : `${selectedImgFile.name} selected`}
          </label>
        </button>
        <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '20px 10px',

          }}>
        <label htmlFor="banner-file-input" className="m-0 w-100">
            <input
              accept={'img/*'}
              style={{ display: 'none' }}
              id="banner-file-input"
              type="file"
              onChange={handleBannerFileChange}
            />
            {!selectedBannerFile ? 'insert a background' : `${selectedBannerFile.name} selected`}
          </label>
        </button>
    
    <TextField
         label="paste the full description of this product"
         name="overview"
        value={formData.overview}
        onChange={handleChange}
        required
    />
    <Button type="submit" variant="Button" color="primary" >
          Add product
        </Button>
     </form>
        </div>
      </div>
    
    </> 
    );
}

 
export default CreateProduct;