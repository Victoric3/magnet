import React, { useEffect, useState } from "react";
import FormList from "../../utilities/list";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../utilities/AuthContext';
import { deliveryList } from '../../utilities/formLists'
import { eShopCategoryList } from '../../utilities/formLists'
import { pShopCategoryList } from '../../utilities/formLists'
import { shopTypeList } from '../../utilities/formLists'
import Page1 from "./page1";
import Layout from "../../utilities/layout";
import useTheme from '@mui/material/styles/useTheme';
import Page2 from "./page2";


const CreateShop = () => {
  const { 
    updateAuth, 
    userData, 
    token, 
    updateCurrentShopData, 
    messageShower, 
    handleMsgCollector,
    baseUrl
  } = useAuth();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        shopOverview: '',
        shopCatchPhrase: '',
        linkedIn: '',
        twitter: '',
        instagram: '',
        faceBook: '',
        closingHours: '',
        openingHours: '',
        homeDeliverySpeed: '',
        homeDeliveryFee: '',
        deliveryLocations: []
      });
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const updateFormData = (updatedData) => {
        setFormData((prevData) => ({
          ...prevData,
          deliveryLocations: updatedData,
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


       const deliveryPatternList = [
         'Home deliveries only',
         'DeliveryPoints only',
         'Home deliveries and DeliveryPoints'
       ]
       const [deliveryPattern, setDeliveryPattern] = useState('')
       const handleDeliveryPattern = (value) => {
             setDeliveryPattern(value);

       }
       
       const [checked, setChecked] = useState(false);
     
       const handleCheckboxChange = event => {
         setChecked(event.target.checked);
       };

       ///handle submit function
       const handleSubmit = async (event) => {
         event.preventDefault();
         setError(null)
         setSuccess(null)
         messageShower(true)
        const form = new FormData();

        if (selectedImgFile) {
          form.append("shopImg", selectedImgFile);
        }
         if (selectedBannerFile) {
          form.append("shopBanner", selectedBannerFile);
        }
        if(!selectedImgFile && !selectedBannerFile){
          setError('your shop img is required')
        }
        
      const nonImageFields = {
        ...formData,
        shopType: value,
        category: categoryValue,
        homeDeliveryDistance: deliveryListValue,
      };

        if(!selectedImgFile){
            setError('please select an image for your shop')
            return;
        }else if(!selectedBannerFile){
            setError("please select an image for your shop's banner")
            return;
        }else if(!value){
            setError('what type of shop is this')
            return;
        }else if(!checked){
            setError('please accept our terms of service')
            return;
        }else if(!categoryValue){
            setError('please select your shop category')
            return;
        }else if(!deliveryListValue){
            setError('please select how far you can deliver services')
            return;
        }else{

          let response
        try {
          response = await fetch(baseUrl('shops/'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
          
          ,
          body: JSON.stringify(nonImageFields),
        });
            
        if (response.ok) {
          const data = await response.json()
       try{
        const responseImg = await fetch(baseUrl(`shops/${data.shop._id}`), {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form,
      });
      if(responseImg.ok){
        const shopData  = await responseImg.json()
        localStorage.setItem("currentShopData", JSON.stringify(shopData.shopData)) 
              setError(null);
              setSuccess('your shop was created successfully');  
              setTimeout(() => {navigate('/MyPshop')}, 2000)
      }else{
        setError('there was an issue uploading your image, please do that by updating your shop with your desired image')
        navigate('/MyPshop');
      }} catch(err){
        setError(err.message)
        }
                
      }else if(response.status === 400){
        const error = await response?.json()
        console.log(error, 'errorMessage');
        setError(error?.errorMessage)
      }
    } catch (error) {
      setError(error.message)
    }
    }
        
       }
       useEffect(() => {
        handleMsgCollector(Error, Success);
      }, [Error, Success]);
      const totalPages = 2
      const [currentPage, setCurrentPage] = useState(1)
      const handleNext = (event) => {
        event.preventDefault()
        if(currentPage < totalPages){
           setCurrentPage(currentPage + 1)
          }else{
            setCurrentPage(currentPage - 1)
          }
      }
      const theme = useTheme()
    return ( 
    <>
      <Layout sx={{
        padding: '20px 150px',
        [theme.breakpoints.down('sm')]:{
          padding: '15px'
        }
      }}>

      {currentPage===1 && <Page1 
      handleChange = {handleChange}
      handleNext = {(e) => {handleNext(e)}} 
      shopTypeList = {shopTypeList} 
      handleListValue = {handleListValue}
      handleCategoryListValue = {handleCategoryListValue}
      categoryList = {categoryList}
      formData = {formData}
      selectedBannerFile = {selectedBannerFile}
      handleBannerFileChange = {handleBannerFileChange}
      handleImgFileChange = {handleImgFileChange}
      selectedImgFile = {selectedImgFile}
      />}
      {currentPage===2 && <Page2 
      formData={formData} 
      handleSubmit={handleSubmit} 
      handleListValues={handleDeliveryListValue}
      deliveryList={deliveryList} 
      handleNext={(e) => {handleNext(e)}}
      handleCheckboxChange = {handleCheckboxChange}
      checked= {checked}
      deliveryPattern={deliveryPattern}
      deliveryPatternList={deliveryPatternList}
      handleDeliveryPattern={handleDeliveryPattern}
      updateFormData={updateFormData}
      handleChange={handleChange}
      />}
      </Layout>
    
    </> 
    );
}
 
export default CreateShop;