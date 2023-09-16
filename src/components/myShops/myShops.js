import React, { useEffect, useState } from 'react';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { CompanyCard } from './myShops-card';
import { CompaniesSearch } from './myShops-search';
import Layout from '../utilities/layout';
import { useAuth } from '../utilities/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Myshops = () => {
  const { shopData, baseUrl, updateAuth, token } = useAuth()
  const navigate = useNavigate()
  const [IsEditing, setIsEditing] = useState(false)
  useEffect(() => {
    fetch(baseUrl(`shops/`), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      updateAuth( data.shopData)
    })
    .catch(error => {
      console.error('Error fetching shop data, please login or reload the page')
    });
  }, []);
  return(
  <>
  <Layout>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Your Shops
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <div >
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
                sx={{marginRight: '2px', marginTop: '2px'}}
                onClick = {() => setIsEditing(!IsEditing)}
              >
                Edit
              </Button>
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
                onClick = {() => {navigate('/createShop')}}
                sx={{marginTop: '2px'}}
              >
                Add
              </Button>
            </div>
          </Stack>
          <CompaniesSearch />
          <Grid
            container
            spacing={3}
          >
            {shopData?.length > 0 ? shopData?.map((shop, index) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={index}
              >
                <CompanyCard shop={shop} Editing={IsEditing}/>
              </Grid>
            ))
            :
            <div style={{
              margin: '10px auto',
              display: 'flex',
              textAlign: 'center'
              }}>
            <Typography variant="h6"> you don't have any shop at the moment <span style={{display: 'block'}}><Link to='/CreateShop'>
            create shop here
            </Link></span></Typography>
            </div>
          }
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={3}
              size="small"
            />
          </Box>
        </Stack>
      </Container>
    </Box>:
    

    </Layout>
  </>  
  )
}

export default Myshops;
