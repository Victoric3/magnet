import React, { useState } from "react";
import { useAuth } from "./utilities/AuthContext";
import { useNavigate } from "react-router-dom";
import './utilities/editShop.css'
import { Button, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const EditShop = () => {
    const { currentShopData } = useAuth()
    const navigate = useNavigate()
    const handleUpdate = (event, currentShopData) => {
        event.preventDefault()
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
    return ( 
    <>
    <div className="edit-shop-wrrapper">
    <div className="edit-shop-items">
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Shop Name</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Shop Name"
            name="name"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Tag Line</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Tag Line"
            name="tagLine"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Catch Pharase</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Catch Pharase"
            name="catchPhrase"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Location</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Location"
            name="location"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Delivery Distance</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Delivery Distance"
            name="name"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Opening Hours</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New openingHours"
            name="name"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Closing Hours</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Closing Hours"
            name="name"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Email</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Email"
            name="name"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Facebook</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Facebook"
            name="name"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Instagram</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Instagram"
            name="name"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Twitter</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New Twitter"
            name="name"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">LinkedIn</Typography>
            </div >
            <div className="edit-shop-details">
            <TextField 
            variant="standard"
            label="New LinkedIn"
            name="name"
            />
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
            <div className="edit-shop-caption">
                <Typography variant="h4">Shop Banner</Typography>
            </div >
            <div className="edit-shop-details">
            <button style={{ 
          border: '1px solid #333333b0', 
          background: '#fff', 
          color: '#333333b0',
          textAlign: 'left',
          padding: '10px 14px',

          }} type="button">
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
            <EditIcon />
            </div>
        </div>
        <div className="edit-shop-content">
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
            <EditIcon />
            </div>
        </div>
      
    </div>
    <div className="edit-shop-button-wrrapper">
    <button 
    type="button" 
    onClick={() => {navigate('/editProduct')}}
    className="save-button"
    >edit product</button>
    <button 
    type="button" 
    onClick={(event) => {handleUpdate(event, currentShopData)}}
    className="save-button"
    >save changes</button>
    </div>
    
    </div>
    
    
    
    </> 
    );
}
 
export default EditShop;