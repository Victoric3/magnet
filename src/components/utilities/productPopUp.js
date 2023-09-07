import React, { useState } from "react";
import './productPopUp.css'
import { Button, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from './AuthContext'




const ProductPopUp = ({ description, pay }) => {
    const {updateShowPopUp, showPopUp} = useAuth()
    const [showDescription, setShowDescription] = useState(true)
    const [showPay, setShowPay] = useState(false)
    return ( 
    <>
<div className="overlay">
    <div className="product-pop-up-container">
        <div>
            <CloseIcon 
            sx={{position: 'fixed', right:'0', display: 'block', zIndex: '8000', cursor: 'pointer'}}
            onClick={() => {updateShowPopUp(!showPopUp)}}
            />
            <div className="product-pop-up-buttons">
                <Button 
                variant="h3" 
                onClick={() => {
                    setShowPay(false)
                    setShowDescription(true)
                }}
                sx={{width: '50%'}}
                >Description</Button>
                <Button 
                variant="h3"
                onClick={() => {
                    setShowDescription(false)
                    setShowPay(true)
                }}
                sx={{width: '50%'}}
                >Pay</Button>
            </div>
            <div className="product-pop-up-content">
                {showDescription && <Typography variant="h4">{description}</Typography>}
                {showPay && <Typography variant="h4">{pay} pay for item</Typography>}
            </div>
        </div>

    </div>
</div>
    
    
    </> 
    );
}

export default ProductPopUp;