import React from "react";
import { Typography, useMediaQuery, Button } from "@mui/material";
import RotatingCard from "./utilities/rotatingCard";
import responsiveFlexStyle from "./utilities/flexContainerRotating.css";
import responsiveFlexStyleSquare from "./utilities/flexContainerSquare.css";
import SquareCard from "./utilities/squareCard";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import FAQComponent from "./utilities/faqComp";
import ContactComponent from "./utilities/contact";
import Banner from "./home/banner";
import LandingPageSection from "./home/feature2";
import marketerImg from '../img/affiliate.jpg'
import faqImg from '../img/questions-6988157_1280-removebg-preview.png'
import Investment from '../img/investment.jpg'
import Shopping from '../img/shop.jpg'
import Skill from '../img/skill.jpg'


import { 
  faqData,
  PromoteBackInfo,
  PromoteFrontInfo,
  eShopBackInfo,
  eShopFrontInfo,
  ShopBackInfo,
  ShopFrontInfo
} from "./home/formLists";
import cardBackground from '../img/_4872d2e3-da27-45b1-9b87-bc68d06aafd4.jpg'

const Home = () => {

  //img data
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));



    
    return ( 
      <>

      <Banner />

      <div style={{
        width: isMobile? '100%' : '85%',
        padding: isMobile? '10px' : '0px',
        margin: '100px auto'
      }}>
        <LandingPageSection 
        caption ={"Showcase Your Skills and Earn Money"}
        description={'Create your own profile and list your skills or gigs that you can offer to others. We make it easy for you to reach a global market of customers who are looking for your services. Skill has never been more rewarding and flexible.'}
        buttonText={'become a freeLancer'}
        imageUrl={Skill}
        />
        <LandingPageSection 
        caption ={'We reward you for recommending our high-quality products to users in need of it'}
        description={"Whether you already have solid marketing skills or you are just starting out, our team of seasoned marketing experts is here to kickstart your journey or take your skills to the next level!"}
        buttonText={'become a marketer'}
        imageUrl={marketerImg}
        inverted
        />
        <LandingPageSection 
        caption ={"Create a physical store"}
        description={'Do you have a product you’re proud of and want to sell to others? We provide the space to help you display your own merchandise. Our team of reliable partners will ensure that your product is delivered to the customer, connecting you with satisfied buyers.'}
        buttonText={'become a partner'}
        imageUrl={Shopping}
        />
        <LandingPageSection 
        caption ={'Boost Your Business with Capital'}
        description={"Discover a new way to access funding and grow your business. We help you list your shop on our platform, where you can attract investors who share your vision."}
        buttonText={'Explore the stock market'}
        imageUrl={Investment}
        inverted
        />
      <div style={{
        position: 'relative',
        backgroundImage: `url(${cardBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '150px',
        borderRadius: '10px',
        overflow: 'hidden', /* Ensures the overlay does not overflow */
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Typography variant="h4" 
            sx={{ 
              textAlign: 'center',
              fontWeight: '500',
              color: 'white',
            }}>
            Just like a magnet,
          </Typography>
          <Typography variant="h4" 
            sx={{ 
              marginTop: '5px', 
              marginBottom: '15px', 
              textAlign: 'center', 
              color: 'white',
              fontWeight: '500',
            }}>
            we attract your products to buyers
          </Typography>
        </div>
      </div>


       
       <div className="responsive-flex-container" style={responsiveFlexStyle}>
       <div className="card">
       <RotatingCard 
       FrontContent= { ShopFrontInfo }
       BackContent={ ShopBackInfo }
       />
         </div>
       <div className="card">
       <RotatingCard 
       FrontContent= { PromoteFrontInfo }
       BackContent={ PromoteBackInfo }
       />
       </div>
       <div className="card">
       <RotatingCard 
       FrontContent= { eShopFrontInfo }
       BackContent={ eShopBackInfo }
       />
       </div>
       </div>
      

       {/* //squareCard */}
       <Typography variant="h4" sx={{ 
        marginTop: '100px', 
        marginBottom: '50px', 
        fontWeight: '600',
        textAlign: 'center'
        }}>
          Main Features
       </Typography>
       <div className="responsive-flex-square-container" style={responsiveFlexStyleSquare}>
       <SquareCard 
       title={'Email Tool'}
       content={'Send emails to all your customers, up to 5 free emails a week, with our user friendly email list'} 
       icon={EmailOutlinedIcon}
       className='square-card'
       />
       <SquareCard 
       title={'User Dashboard'}
       content={'Track your shop visits, shop sales, and affiliate sales all in one place'} 
       icon={GridViewOutlinedIcon}
       className='square-card'
       />
       <SquareCard 
       title={'Easy withdrawal'}
       content={'Receive money in any currency with your dollar wallet and withdraw instantly to your local bank account'} 
       icon={WalletIcon}
       className='square-card'
       />
       <SquareCard 
       title={'Collaboration'}
       content={"Collaborate with shops, promote one another's goods and reach more interested customers"} 
       icon={Groups2OutlinedIcon}
       className='square-card'
       />
       </div>
       <div>
       {/* <ReviewCarousel images={Images} /> */}
       </div>
       <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
       }}>
        <div style={{
          maxWidth: isMobile ? '100%' : '50%',
        }}>
       <FAQComponent faqData={faqData}/>
       
        </div>
       <div style={{
         display: 'flex',
         justifyContent: 'flex-end',
         alignItems: 'center',
         maxWidth: '50%',
         height: 'auto'
        }}>
        {isMobile? '' : <img src={faqImg} alt="faq Page" />}
      </div>
         </div>     
      <Typography variant='h5' 
      sx={{ 
        textAlign: 'center', 
        fontWeight: '700',
        marginTop: '100px',

      }}> Haven't found an answer yet? you can visit the faq page below and make your inquires</Typography>
      <Button variant='button'
      sx={{
          marginTop: '50px',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
          border: '1px solid black',
          borderRaduis: '10px',
          padding: '11px',
          background: theme=> theme.palette.secondary.main,
          color: theme=> theme.palette.background.default,
          '&:hover': {
              color: theme=> theme.palette.secondary.main,
              background: theme=> theme.palette.background.default
          }
      }}
      >more answers</Button>
       </div>
       <ContactComponent />
       </>
     );
}
 
export default Home;