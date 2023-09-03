import React, { useEffect, useState } from "react";
import FormList from "./utilities/list";
import { TextField, Button } from "@mui/material";
import './utilities/createShop.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from './utilities/AuthContext';


const CreateShop = ({ handleMsgCollector, messageShower }) => {
  const { updateAuth, isLoggedIn, userData, token } = useAuth();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        shopOverview: '',
        shopCatchPhrase: '',
        linkedIn: '',
        twitter: '',
        instagram: '',
        facebook: '',
        location: '',
        closingHours: '',
        openingHours: '',
      });
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const [Error, setError] = useState(null)
      const [Success, setSuccess] = useState(null)
      const [value, setValue] = useState('')
      const [categoryValue, setCategoryValue] = useState('')
      const [deliveryListValue, setDeliveryListValue] = useState('')
      const handleListValue = (value) => {
          setValue(value)
      }
      const handleCategoryListValue = (value) => {
          setCategoryValue(value)
      }
      const handleDeliveryListValue = (value) => {
          setDeliveryListValue(value)
      }

      const shopTypeList = ['Eshop', 'Pshop'];
      const pShopCategoryList = [
        "Accessories & Jewelry",
        "Art & Craft Supplies",
        "Automotive & Tools",
        "Baby & Kids",
        "Beauty & Personal Care",
        "Books & Stationery",
        "Clothing & Fashion",
        "Electronics & Gadgets",
        "Fitness Equipment",
        "Food & Grocery",
        "Furniture & Decor",
        "Games & Puzzles",
        "Gardening Supplies",
        "Health & Wellness",
        "Home & Living",
        "Kitchen & Dining",
        "Music & Instruments",
        "Outdoor Gear",
        "Party & Event Supplies",
        "Pet Supplies",
        "Shoes & Footwear",
        "Sports & Outdoors",
        "Toys & Games",
        "Travel & Luggage",
        "Watches & Accessories",
        "Wedding & Bridal",
        "Wine & Spirits",
        "Workout Apparel",
        "Yoga & Meditation",
        "Zoo & Animal Supplies",
      ]
      const eShopCategoryList = [
        
          "Art & Design",
          "Business & Finance",
          "Cooking & Recipes",
          "Crafting & DIY",
          "Education & E-Learning",
          "Entertainment & Media",
          "Fitness & Health",
          "Graphic Design",
          "Home & Interior Design",
          "Language Learning",
          "Marketing & Advertising",
          "Music & Audio",
          "Online Courses",
          "Photography & Videography",
          "Programming & Coding",
          "Software & Apps",
          "Social Media Templates",
          "Stock Photos & Videos",
          "Web Development",
          "Writing & Publishing",
          "Ebooks & Audiobooks",
          "Printable Templates",
          "Virtual Events & Conferences",
          "Webinars & Workshops",
          "Digital Art & Illustration",
          "Game Development",
          "Mobile Apps",
          "Website Themes & Templates",
          "Video Editing & Effects",
          "Digital Patterns & Designs",
        ]
        const deliveryList = [
          'intra-state',
          'inter-state',
          'worldwide'
        ]
        
            
       const categoryList = value===shopTypeList[0]?eShopCategoryList:pShopCategoryList
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


       const handleSubmit = async (event) => {
         event.preventDefault();
        const form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("shopOverview", formData.shopOverview);
        form.append("shopCatchPhrase", formData.shopCatchPhrase);
        form.append("linkedIn", formData.linkedIn);
        form.append("twitter", formData.twitter);
        form.append("instagram", formData.instagram);
        form.append("facebook", formData.facebook);
        form.append("location", formData.location);
        form.append("closingHours", formData.closingHours);
        form.append("openingHours", formData.openingHours);
        form.append("shopType", value);
        form.append("category", categoryValue);
        form.append("deliverableDistance", deliveryListValue);

        if (selectedImgFile) {
          form.append("shopImg", selectedImgFile);
        }
         if (selectedBannerFile) {
          form.append("shopBanner", selectedBannerFile);
        }
        if(!selectedImgFile && !selectedBannerFile){
          setError('your shop img is required')
        }

        let response
          try {
              response = await fetch('http://localhost:8000/api/v1/shops/', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`
              },
              body: form,
            });
      
            if (response.ok) {
              const data = await response.json()
              updateAuth(userData, isLoggedIn, token, data.shop)
              setError(null);
              setSuccess('your shop was created successfully');  
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
          <h2>Create a shop</h2>
          <form onSubmit={handleSubmit}>
        <TextField
            label="Shop name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="youremail@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
        />
        <FormList 
        items={shopTypeList} 
        listCaption= 'what type of shop is this?' 
        handleListValue={handleListValue}/>
        <FormList 
        items={categoryList} 
        listCaption= 'select a category for your shop' 
        handleListValue={handleCategoryListValue}/>
        {value===shopTypeList[1]? <FormList items={deliveryList} 
        listCaption= 'service delivery distance' 
        handleListValue={handleDeliveryListValue}/> : ''}
        
        <TextField
            label="opens at?..."
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            required
        />
        <TextField
            label="closes at?..."
            name="closingHours"
            value={formData.closingHours}
            onChange={handleChange}
            required
        />
       
        <TextField
            label="please specify your location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
        />
        <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '20px 10px',

          }}>
        <label htmlFor="Img-file-input" className="m-0 w-100">
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
        <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '20px 10px',

          }}>
        <label htmlFor="banner-file-input" className="m-0 w-100">
            <input
              accept={'image/*'}
              style={{ display: 'none' }}
              id="banner-file-input"
              type="file"
              onChange={handleBannerFileChange}
            />
            {!selectedBannerFile ? 'select your shop profile banner' : `${selectedBannerFile.name} selected`}
          </label>
        </button>
        <TextField
            label="paste your faceBook profile link"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
        />
        <TextField
            label="paste your instagram profile link"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
        />
        <TextField
            label="paste your twitter profile link"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
        />
        <TextField
            label="paste your linkedIn profile link"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
        />
        <TextField
            label="your tagline"
            name="shopCatchPhrase"
            value={formData.shopCatchPhrase}
            onChange={handleChange}
            required
        />
        <TextField
            label="describe your shop"
            name="shopOverview"
            value={formData.shopOverview}
            onChange={handleChange}
            required
        />
       
        <Button type="submit" variant="Button" color="primary" >
          Create shop
          </Button>
          </form>
        </div>
      </div>
        
        

    
    </> );
}
 
export default CreateShop;