import React, { useState } from "react";
import {Typography, useMediaQuery, SvgIcon, Tooltip, Badge, IconButton, Card}  from '@mui/material';
import image1 from '../../img/istockphoto-1290646966-612x612.jpg'
import { useAuth } from "../utilities/AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TourIcon from '@mui/icons-material/Tour';
import CompareIcon from '@mui/icons-material/Compare';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from "@mui/system";


const ProductCard = () => {
    const [discount, setDiscount] = useState(true)
    const { userData } = useAuth()
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const isAvgScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isNexhubtMax = useMediaQuery((theme) => theme.breakpoints.down('xl'));

    return ( <>
    <Card sx={{ borderRadius: '0px'}}>
        <Box>
        <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            maxWidth: isMobile ? '100%' : '250px',
            gap: '10px',
            height: isMobile? '150px' : 'auto'
        }}>
            <img src={image1} alt="shoe" style={{
                width: isMobile? '150px' : '250px',
                height: isMobile? '150px' : '200px'
            }}/>
            <div style={{display: 'flex', gap: '20px', flexDirection: 'column', padding: '5px',}}>
            <div>
            <Typography variant="body2">Nike shoe</Typography>
            <Typography variant="h6">Nike AirMax 2022 Running Shoe - Black/Red</Typography>
            </div>
            <div style={{display: 'flex', flexWrap: 'nowrap', alignItems: 'end', justifyContent: 'space-between'}}>

            <div>
                {discount ? <Typography variant="body2" sx={{textDecoration: 'line-through'}}>$250</Typography> : ''}
                <Typography variant="h6">$430</Typography>
            </div>
            <div style={{display: 'flex'}}>

                <Tooltip title="Add to wishList">
                <IconButton>
                    <SvgIcon fontSize="small">
                    <FavoriteIcon />
                    </SvgIcon>
                </IconButton>
                </Tooltip>
                <Tooltip title="Compare">
                <IconButton>
                    <Badge
                    badgeContent={4}
                    color="success"
                    maxContent={9}
                    >
                    <SvgIcon fontSize="small">
                    <CompareIcon />
                    </SvgIcon>
                    </Badge>
                </IconButton>
                </Tooltip>
                <Tooltip title="Visit shop">
                <IconButton>
                    <SvgIcon fontSize="small">
                    <TourIcon />
                    </SvgIcon>
                </IconButton>
                </Tooltip>
                <Tooltip title="Add to cart">
                <IconButton>
                    <Badge
                    badgeContent={4}
                    color="error"
                    maxContent={99}
                    >
                    <SvgIcon fontSize="small">
                    <ShoppingCartIcon />
                    </SvgIcon>
                    </Badge>
                </IconButton>
                </Tooltip>
            </div>
                    </div>
            </div>
        </div>
            </Box>
        </Card>
    
    
    
    </> );
}
 
export default ProductCard;