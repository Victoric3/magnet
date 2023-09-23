import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utilities/AuthContext';
import { TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { returnPolicyList } from '../../utilities/formLists';
import { CompanyCard } from "../myShops-card";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Button,
  Grid,
  Stack,
  Container,
  Box,
  SvgIcon
} from '@mui/material';
import Layout from '../../utilities/layout';
import Page2 from '../createProduct/page2';
import Page3 from '../createProduct/page3';
import Page1 from '../createProduct/page1';


const EditProduct = () => {
    const { currentProductData,currentShopData, token, baseUrl, messageShower, handleMsgCollector } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
      const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        name: currentProductData.name,
        price: currentProductData.price,
        commision: currentProductData.commision,
        productOverview: currentProductData.productOverview,
        discount: currentProductData.discount,
        quantity: currentProductData.quantity,
        productSpecifications: currentProductData.productSpecifications,
        deliveryLocations: currentProductData?.deliveryLocations || currentShopData?.deliveryLocations,
        homeDeliverySpeed: parseInt(currentProductData?.homeDeliverySpeed, 10),
        homeDeliveryDistance: currentProductData?.homeDeliveryDistance || currentShopData?.homeDeliveryDistance,
        homeDeliveryFee: currentProductData?.homeDeliveryFee || currentShopData?.homeDeliveryFee
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
          productSpecifications: updatedData,
        }));
      };
      const updatedeliveryFormData = (updatedData) => {
        setFormData((prevData) => ({
          ...prevData,
          deliveryLocations: updatedData,
        }));
      };
      const [isEditing, setIsEditing] = useState(false)
       
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
    const [returnPolicy, setReturnPolicy] = useState('')
    const [productType, setProductType] = useState('')
       
    const handleListValue = (value) => {
        setReturnPolicy(value)
    }
    const handleTypeListValue = (value) => {
      setProductType(value)
    }
     const handleUpdate = async(event) => {
       event.preventDefault()
        messageShower(true)
        const form = new FormData();
        if(image1){
          form.append("image1", image1);
        }
        if(image2){
          form.append("image2", image2);
        }
        if(image3){
          form.append("image3", image3);
        }
        if(image4){
          form.append("image4", image4);
        }
        if(formData.returnPolicy && !returnPolicyList.includes(formData.returnPolicyList)){
          setSuccess(null)
          setError(`allowed values for return policy are ${{...returnPolicyList}}`)
          return;
        }
      const nonImageFields = {
        ...formData,
      };
          let response
        try {
          response = await fetch(baseUrl(`products/details/${currentProductData._id}`), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(nonImageFields),
        });
            
        if (response.ok) {
            setSuccess('your product has been successfully updated, changes will take effect when u navigate to dashboard')
        const data = await response.json()
        localStorage.setItem('currentProductData', JSON.stringify(data.productData))
        setIsEditing(!isEditing)
        if(image1 || image2 || image3 || image4){
       try{
        const responseImg = await fetch(baseUrl(`products/${currentProductData._id}`), {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form,
      });
      if(responseImg.ok){
              setError(null);
              setSuccess('your product was updated successfully, changes will take effect when u navigate to dashboard');  
              
      }} catch(err){
        setError(err)
        }
        }          
      }
    } catch (error) {
      setError('something went wrong, check your internet connection and try again')
    }
    }
    useEffect(() => {
        handleMsgCollector(error, success);
      }, [error, success]);
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
      const productCount = currentShopData?.orders?.reduce((count, order) => {
        if (order.status === 'completed' && order.id === currentProductData._id) {
          return count + 1;
        }
        return count;
      }, 0);
    return ( <>
    <Layout>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg" sx={{width: '100%'}}>
        <Stack spacing={3}>
          <div style={{
            paddingBottom: '30px', 
            display: 'flex', 
            justifyContent: 'space-between'
            }}>
            <Typography variant="h4">
              Product
            </Typography>
            <Button variant="contained" type='button' onClick={(event) => {handleUpdate(event)}}>
                    save
              </Button>
          </div>
          <div>
            <Grid
              container
              spacing={3}
              >
              <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  sx={{
                    paddingBottom: '20px',
                  }}
                >
                <CompanyCard 
                sx={{width: '310px'}} 
                image={currentProductData.imageUrl1}
                name={currentProductData.name}
                catchPhrase={currentProductData.description}
                orders={currentProductData?.likes || 0}
                items={productCount || 0}
                ordersCaption={'like(s)'}
                itemsCaption={'sale(s)'}
                ordersIcon={(
                  <SvgIcon
                    color="action"
                    fontSize="small"
                  >
                    <FavoriteIcon />
                  </SvgIcon>
                )}
                />
              </Grid>
                      {currentPage===1 && <Grid
                      xs={12}
                      md={6}
                      lg={8}
                      ><Page1 
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
                  /></Grid>}
                  {currentPage===2 && <Grid
                  xs={12}
                  md={6}
                  lg={8}
                  ><Page2 
                      updateFormData ={updateFormData}
                      handleNext={handleNext}
                      handlePrevious={handlePrevious}
                      formData={formData}
                      Page2EditCaption1={'Edit or add specifications'}
                      Page2EditsubHeader1={'you can edit these fields'}
                  /></Grid>}
                  {currentPage===3 && <Grid
                  xs={12}
                  md={6}
                  lg={8}
                  ><Page3 
                    formData={formData}
                    updatedeliveryFormData={updatedeliveryFormData}
                    handleChange={handleChange}
                    handlePrevious={handlePrevious}
                    handleSubmit={handleUpdate}
                    checkbox={false}
                  /></Grid>}
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
    </Layout>
</>);
}
 
export default EditProduct;