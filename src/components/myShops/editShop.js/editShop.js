import React, { useState, useEffect } from "react";
import { useAuth } from "../../utilities/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { deliveryList } from "../../utilities/formLists";
import {
  Button,
  Grid,
  Stack,
  Container,
  SvgIcon
} from '@mui/material';
import { Box } from "@mui/system";
import Layout from "../../utilities/layout";
import ShopDetails from "./page";
import { CompanyCard } from "../myShops-card";
import Page2 from "./page2";
import ReceiptIcon from '@mui/icons-material/Receipt';



const EditShop = () => {
    const { currentShopData, token, baseUrl, messageShower, handleMsgCollector } = useAuth()
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        name: currentShopData.name,
        email: currentShopData.email,
        shopOverview: currentShopData.shopOverview,
        shopCatchPhrase: currentShopData.shopCatchPhrase,
        linkedIn: currentShopData.linkedIn,
        twitter: currentShopData.twitter,
        instagram: currentShopData.instagram,
        faceBook: currentShopData.facebook,
        closingHours: currentShopData.closingHours,
        openingHours: currentShopData.openingHours,
        deliveryLocations: [currentShopData.deliveryLocations],
        homeDeliverySpeed: parseInt(currentShopData.homeDeliverySpeed, 10),
        homeDeliveryDistance: currentShopData.homeDeliveryDistance,
        homeDeliveryFee: currentShopData.homeDeliveryFee
      });
      console.log(currentShopData);      
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const updatedeliveryFormData = (updatedData) => {
        setFormData((prevData) => ({
          ...prevData,
          deliveryLocations: updatedData,
        }));
      };
      const [error, setError] = useState('')
      const [success, setSuccess] = useState('')
      const [IsEditing, setIsEditing] = useState(false)
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
        if(formData.homeDeliveryDistance && !deliveryList.includes(formData.homeDeliveryDistance)){
          setSuccess(null)
          setError('allowed values for homeDeliveryDistance are "inter-state, worldwide, intra-state"')
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
            setSuccess('your shop was updated successfully, changes will take effect after some time')
        const data = await response.json()
        localStorage.setItem('currentShopData', JSON.stringify(data.shopData))
        setIsEditing(!IsEditing)
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
              setSuccess('your shop was updated successfully');  
              
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
      
    return ( 
    <>
    <Layout>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <div style={{
            paddingBottom: '30px', 
            display: 'flex', 
            justifyContent: 'space-between'
            }}>
            <Typography variant="h4">
              Shop
            </Typography>
            <Button variant="contained" type='button' onClick={(event) => {handleNext(event)}}>
                    {currentPage===1? 'Edit Location' : 'Edit Details'}
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
                  sx={{paddingBottom: '20px'}}
                >
                <CompanyCard 
                  sx={{width: '310px'}}
                  image={currentShopData.shopImgUrl}
                  name={currentShopData.name}
                  catchPhrase={currentShopData.shopCatchPhrase}
                  orders={currentShopData?.orders?.length || 0}
                  items={currentShopData?.products?.length || 0}
                  ordersCaption={'order(s)'}
                  itemsCaption={'product(s)'}
                  ordersIcon={(
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <ReceiptIcon />
                    </SvgIcon>
                  )}
                />
              </Grid>
              {currentPage===1 && <Grid
                xs={12}
                md={6}
                lg={8}
                >
                <ShopDetails 
                formData = {formData}
                handleChange={handleChange} 
                selectedBannerFile={selectedBannerFile} 
                handleBannerFileChange={handleBannerFileChange}
                selectedImgFile={selectedImgFile}
                handleImgFileChange={handleImgFileChange}
                handleUpdate={handleUpdate}
                />
              
              </Grid>}
              {currentPage===2 && <Grid
                xs={12}
                md={6}
                lg={8}
                >
                <Page2 
                formData = {formData}
                handleChange={handleChange} 
                updatedeliveryFormData={updatedeliveryFormData}
                handleUpdate={handleUpdate}
                />
              </Grid>}
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
    </Layout>
    
    
    
    </> 
    );
}
 
export default EditShop;