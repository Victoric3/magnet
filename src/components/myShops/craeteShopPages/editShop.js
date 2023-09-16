import React, { useState, useEffect } from "react";
import { useAuth } from "../../utilities/AuthContext";
import { useNavigate } from "react-router-dom";
import './editShop.css'
import { TextField, Typography } from "@mui/material";


const EditShop = () => {
    const { currentShopData, token, baseUrl, messageShower, handleMsgCollector } = useAuth()
    const navigate = useNavigate()
    const deliveryList = [
      'intra-state',
      'inter-state',
      'worldwide'
    ]
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
        deliverableDistance: ''
      });
      
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const [error, setError] = useState('')
      const [success, setSuccess] = useState('')
      const [isEditing, setIsEditing] = useState(false)
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
    const handleUpdate = async(event) => {
        event.preventDefault()
        messageShower(true)
        const form = new FormData();

        if (selectedImgFile) {
          form.append("shopImg", selectedImgFile);
        }
         if (selectedBannerFile) {
          form.append("shopBanner", selectedBannerFile);
        }
        if(formData.deliverableDistance && !deliveryList.includes(formData.deliverableDistance)){
          setSuccess(null)
          setError('allowed values for deliverableDistance are "inter-state, worldwide, intra-state"')
          return;
        }
      const nonImageFields = {
        ...formData,
      };
          let response
        try {
          response = await fetch(baseUrl(`shops/details/${currentShopData._id}`), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(nonImageFields),
        });
            
        if (response.ok) {
            setSuccess('your shop has been successfully updated, changes will take effect when u navigate to dashboard')
        const data = await response.json()
        localStorage.setItem('currentShopData', JSON.stringify(data.shopData))
        setIsEditing(!isEditing)
        if(selectedImgFile || selectedBannerFile){
       try{
        const responseImg = await fetch(baseUrl(`shops/${currentShopData._id}`), {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form,
      });
      if(responseImg.ok){
              setError(null);
              setSuccess('your shop was updated successfully, changes will take effect when u navigate to dashboard');  
              
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
      
    return ( 
    <>
    <div className="edit-shop-wrrapper">
        <div className="edit-shop-button-wrrapper">
            <Typography variant="h3">Manage {currentShopData.name}</Typography>
            <div className="edit-buttons">
            <button 
            type="button" 
            onClick={() => {navigate('/deleteProduct')}}
            className="save-button"
            >Manage product</button>
            {!isEditing ? <button 
            type="button" 
            onClick={() => {
                setIsEditing(!isEditing)
            }}
            className="save-button"
            >edit shop </button>
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
                <Typography variant="h4">Shop Name</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.name} 
            label={`${currentShopData.name || 'Non specified'}`}
            name="name"
            />
            </div> : <Typography variant="h4">{currentShopData.name || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Tag Line</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.shopCatchPhrase} 
            label= {`${currentShopData.shopCatchPhrase || 'Non specified'}`}
            name="shopCatchPhrase"
            />
            </div> : <Typography variant="h4">{currentShopData.shopCatchPhrase || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Catch Pharase</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.shopOverview} 
            label={`${currentShopData.shopOverview || 'Non specified'}`}
            name="shopOverview"
            />
            </div> : <Typography variant="h4">{currentShopData.shopOverview || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Location</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.location} 
            label={`${currentShopData.location || 'Non specified'}`}
            name="location"
            />
            </div> : <Typography variant="h4">{currentShopData.location || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Deliverable distance</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.deliverableDistance} 
            label={`${currentShopData.deliverableDistance || 'Non specified'}`}
            name="deliverableDistance"
            />
            </div> : <Typography variant="h4">{currentShopData.deliverableDistance || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Opening Hours</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.openingHours} 
            label={`${currentShopData.openingHours || 'Non specified'}`}
            name="openingHours"
            />
            </div> : <Typography variant="h4">{currentShopData.openingHours || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Closing Hours</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.closingHours} 
            label={`${currentShopData.closingHours || 'Non specified'}`}
            name="closingHours"
            />
            </div> : <Typography variant="h4">{currentShopData.closingHours || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Email</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.email} 
            label={`${currentShopData.email || 'Non specified'}`}
            name="email"
            />
            </div> : <Typography variant="h4">{currentShopData.email || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Facebook</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.faceBook} 
            label={`${currentShopData.faceBook || 'Non specified'}`}
            name="faceBook"
            />
            </div> : <Typography variant="h4">{currentShopData.faceBook || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Instagram</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.instagram} 
            label={`${currentShopData.instagram || 'Non specified'}`}
            name="instagram"
            />
            </div> : <Typography variant="h4">{currentShopData.instagram || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Twitter</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.twitter} 
            label={`${currentShopData.twitter || 'Non specified'}`}
            name="twitter"
            />
            </div> : <Typography variant="h4">{currentShopData.twitter || 'Non specified'}</Typography> }
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">LinkedIn</Typography>
            </div >
            { isEditing ? <div className="edit-shop-details">
            <TextField
            onChange={handleChange}
            value={formData.linkedIn} 
            label={`${currentShopData.linkedIn || 'Non specified'}`}
            name="linkedIn"
            />
            </div> : <Typography variant="h4">{currentShopData.linkedIn || 'Non specified'}</Typography> }
        </div>
        {isEditing ? <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Shop Banner</Typography>
            </div >
             <div className="edit-shop-details">
            <button style={{ 
                border: '1px solid #333333b0', 
                background: '#fff', 
                color: '#333333b0',
                textAlign: 'left',
                padding: '10px  14px',
          }} type="button">
        <label htmlFor="banner-file-input">
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
            </div>
        </div> : ''}
        {isEditing ? <div className="edit-shop-content">
         <div className="edit-shop-caption">
                <Typography variant="h4">Shop Image</Typography>
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
    
    
    
    </> 
    );
}
 
export default EditShop;