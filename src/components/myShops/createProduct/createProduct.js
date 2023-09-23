import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material";
import { useAuth } from '../../utilities/AuthContext';
import { useNavigate } from "react-router-dom";
import Layout from "../../utilities/layout";
import Page1 from "./page1";
import useTheme from '@mui/material/styles/useTheme';
import {CardActions} from '@mui/material';
import { returnPolicyList } from "../../utilities/formLists";
import Page2 from "./page2";
import Page3 from "./page3";


const CreateProduct = () => {
  const navigate = useNavigate()
  const { 
    currentShopData, 
    token, 
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
        quantity: '',
        price: '',
        productSpecifications: [{title: '', items: [{caption: '', description: ''}]}],
        homeDeliverySpeed: currentShopData.homeDeliverySpeed,
        homeDeliveryFee: currentShopData.homeDeliveryFee,
        homeDeliveryDistance: currentShopData.homeDeliveryDistance,
        deliveryLocations: currentShopData.deliveryLocations,
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: value 
      }))}
      const updateFormData = (updatedData) => {
        setFormData((prevData) => ({
          ...prevData,
          productSpecifications: updatedData,
        }));
      };
      console.log(formData);
      const updatedeliveryFormData = (updatedData) => {
        setFormData((prevData) => ({
          ...prevData,
          deliveryLocations: updatedData,
        }));
      };

      
        
    const [returnPolicy, setReturnPolicy] = useState('')
    const [productType, setProductType] = useState('')
       
    const handleListValue = (value) => {
        setReturnPolicy(value)
    }
    const handleTypeListValue = (value) => {
      setProductType(value)
    }
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    
    const handleImgFileChange = (event) => {
      event.preventDefault()
      const file = event.target.files[0];
      const name = event.target.name;

      if (name === 'image1') {
        setImage1(file);
      }
      if (name === 'image2') {
        setImage2(file);
      }
      if (name === 'image3') {
        setImage3(file);
      }
      if (name === 'image4') {
        setImage4(file);
      }
    };
    const [Success, setSuccess] = useState(null)
    const [Error, setError] = useState(null)
    
    const [checked, setChecked] = useState(false);
     
       const handleCheckboxChange = event => {
         setChecked(event.target.checked);
       };
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

        form.append("image1", image1);
        form.append("image2", image2);
        form.append("image3", image3);
        form.append("image4", image4);
        if(!image1 || !image2 || !image3 ){
          setError('please select atLeast three images to display your product')
          return;
        }else if(!returnPolicy){
          setError('please specify a return policy for your products')
          return;
        }else if(!checked){
          setError('please accept our terms of service')
          return;
        }else if(!productType){
          setError('please specify your product type')
          return;
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
              setTimeout(() => {navigate('/MyPshop')}, 2000); 
            }
            else{
              const data = await responseImg.json()
              setError(data.message)
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
  const totalPages = 3
      const [currentPage, setCurrentPage] = useState(1)
      const handleNext = (event) => {
        event.preventDefault()
        if(currentPage < totalPages){
           setCurrentPage(currentPage + 1)
          }
      }
      const handlePrevious = (event) => {
        event.preventDefault()
        if(currentPage > 1){
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
        currentShopData ={currentShopData}
        formData = {formData}
        returnPolicyList = {returnPolicyList}
        handleListValue= {handleListValue}
        handleImgFileChange={handleImgFileChange}
        image1={image1}
        image2={image2}
        image3={image3}
        image4={image4}
        handleChange={handleChange}
        handleTypeListValue={handleTypeListValue}
        handleNext={handleNext}
        />}
        {currentPage===2 && <Page2 
        updateFormData ={updateFormData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        formData={formData}
        />}
        {currentPage===3 && <Page3 
        formData={formData}
        updatedeliveryFormData={updatedeliveryFormData}
        checked={checked}
        handleChange={handleChange}
        handleCheckboxChange = {handleCheckboxChange}
        handlePrevious={handlePrevious}
        handleSubmit={handleSubmit}
        checkbox={true}
        />}
      </Layout>
    
    </> 
    );
}

 
export default CreateProduct;