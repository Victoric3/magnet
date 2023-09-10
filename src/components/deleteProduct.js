import React, { useEffect, useState } from 'react'
import ProductCard from './utilities/productSquareCard';
import { useAuth } from './utilities/AuthContext';
import './utilities/deleteProduct.css'
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import  ConfirmationModal  from './utilities/confirmationModal'

const DeleteProduct = () => {
    const navigate =  useNavigate()
    const { 
        currentShopData, 
        updateProductData, 
        baseUrl, 
        token, 
        allProductData, 
        currentProductData,
        shopProductData,
        handleMsgCollector,
        messageShower,
        userData
    } = useAuth()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [showconfirmModal, setShowconfirmModal] = useState(false);
    useEffect(() => {
        fetch(baseUrl(`products/shop/${currentShopData._id}`), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
            updateProductData(allProductData, data.productData)
        })
        .catch(error => {
          console.error('Error fetching shop data, please login or reload the page')
        });
      }, [currentShopData]);
      const handleDelete = async () => {
        let response
        try {
          response = await fetch(baseUrl(`products/${currentProductData._id}`), {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        if(response.ok){
          setError(null)
          setSuccess(
            `you have successfully deleted ${currentProductData?.name}, do well to inform your customers that this product is no longer available`
            )
        }else if(userData.userName !== currentProductData?.owner){
          setError('you can only delete your shop')
        } else{
          setError('there was a problem deleting shop please try again later')
        }
        
      }catch(e){
        setError(e.message)
      }
      setShowconfirmModal(false);
      messageShower(true)
      const indexOfCurrentshop = shopProductData.indexOf(currentProductData)
      shopProductData.splice(indexOfCurrentshop, 1)
      updateProductData(allProductData, shopProductData)
  }
const openconfirmModal = () => {
  setShowconfirmModal(true);
};

const closeconfirmModal = () => {
  setShowconfirmModal(false);
};
useEffect(() => {
  handleMsgCollector(error, success)
}, [error, success]
)

      return ( 
    <>
    <div className='delete-product-wrapper'>
    <div className='delete-product-caption'>
        <Typography variant='h3'>
            Manage {currentShopData.name} products
        </Typography>
        <button 
            type="button" 
            onClick={() => {navigate('/editProduct')}}
            className="edit-button"
            >edit product</button>
    </div>
    <div className='delete-product-container'>
    {shopProductData?.length > 0  ? shopProductData?.map((product, index) => (
    <div className='delete-product'>
    <ProductCard 
    imageUrl={product.imageUrl} 
    name={product?.name} 
    orgPrice={product?.currencySymbol+ product?.price} 
    discountPrice={product?.currencySymbol+ (product?.price - product?.price * product?.discount/100)}
    productData= {product}
    />
    <div className='edit-icon-wrapper'>
    <EditIcon sx={{cursor: 'pointer'}} onClick={() => {
      localStorage.setItem("currentProductData",  JSON.stringify(shopProductData[index]))
      navigate('/editProduct')
    }}
      
      />
    <DeleteIcon sx={{cursor: 'pointer'}} onClick={() => {
      localStorage.setItem("currentProductData",  JSON.stringify(shopProductData[index]))
        openconfirmModal()
      }}/>
    </div>
    </div>
)): ''}
    </div>
    <ConfirmationModal 
        open={showconfirmModal}
        onClose={closeconfirmModal}
        onConfirm={() => {handleDelete()}}
        message={`are you sure you want to delete ${currentProductData?.name}`}
        /> 
    </div>
    
    
    </> 
    
    
    );
}
 
export default DeleteProduct;