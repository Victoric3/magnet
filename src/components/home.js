import React from "react";
import { Container, Typography,  } from "@mui/material";
import RotatingCard from "./utilities/rotatingCard";
import responsiveFlexStyle from "./utilities/flexContainerRotating.css";
import responsiveFlexStyleSquare from "./utilities/flexContainerSquare.css";
import shopImg from "../img/shop.jpg"
import eShopImg from "../img/E-shop.jpg"
import PromoteImg from "../img/affiliate-marketing.png"
import ToolsImg from "../img/tools.png"
import SquareCard from "./utilities/squareCard";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import ReviewCarousel from "./utilities/carousel";
import MindMap from '../img/alphaMagnetMindMap.png';
import PshopWorkFlow from '../img/work-flow-for-P-shop.png';
import InvestmentProcess from '../img/Investment-process.png';
import PromotersWorkFlow from '../img/process-flow-for-promoters.png'; 
import FAQComponent from "./utilities/faqComp";
import { styled } from '@mui/system';
import ContactComponent from "./utilities/contact";



const Home = () => {
  ///rotating card data
  const ShopFrontInfo = {
    title: `🛒P Shop`,
    imgString: shopImg,
    altString: 'shop image',
    description1: 'Open a physical store online',
    description2: `click to view back`,
    titleColor: theme => theme.palette.background.default,
    titleBackground: theme=> theme.palette.secondary.main,
  }
  const ShopBackInfo = {
    description1: '⚙ this is a place where you can show case the items you sell and can deliver,every physical product is arranged into different categories',
    description2: '⚙ you can maximize your profit by collaborating with other shop owners to share one anothers products and reach more audience fast or you can reach out to affiliates and inducers to promote your products based on personal agreement '
  }
  const eShopFrontInfo = {
    title: `🏪E Shop`,
    imgString: eShopImg,
    altString: 'e shop image',
    description1: 'Open an online store',
    description2: 'click to view back',
    titleColor: theme => theme.palette.background.default,
    titleBackground: theme=> theme.palette.primary.main,
  }
  const eShopBackInfo = {
    description1: '⚙ this is a place where you can show case the digital products you create which may include:E courses, videos, Books, written movies, anime , comic books etc',
    description2: '⚙ you can maximize your profit by collaborating with other shop owners to share one anothers products and reach more audience fast or you can reach out to affiliates and inducers to promote your products based on personal agreement'
  }
  const PromoteFrontInfo = {
    title: `💷Promote`,
    imgString: PromoteImg,
    altString: 'Promote image',
    description1: 'Become an affiliate',
    description2: 'click to view back',
    titleColor: theme => theme.palette.background.default,
    titleBackground: theme=> theme.palette.tetiary.main,
  }
  const PromoteBackInfo = {
    description1: "⚙ this is for users that promote other people's product and get paid,these users are either affiliates or influencers. Affiliates get paid when they make a sale while influencers are paid immediately they are hired",
    description2: '⚙ Every user can promote a product as an affiliate while regular users get 20% commission on sale of magnet courses, affiliates get up to 40%'
  }
  const ToolsFrontInfo = {
    title: `⚙Tools`,
    imgString: ToolsImg,
    altString: 'Tools image',
    description1: 'Tools to maximize sales',
    description2: 'click to view back',
    titleColor: theme => theme.palette.background.default,
    titleBackground: theme=> theme.palette.text.primary,
  }
  const ToolsBackInfo = {
    description1: '⚙ these are special tools like: magnet mailer,used to send emails, WA.Magnet used for whatsapp marketting e.t.c they are all used to maximize sales'
  }

///app container
const AppContainer = styled(Container)({
  maxWidth: '100%',
  overflowX: 'hidden',
  margin: '0 auto'
});
//img data
const Images=[ MindMap, PshopWorkFlow, PromotersWorkFlow, InvestmentProcess]

//faq data
const faqData = [
  { question: 'what is the alpha P-shop about?', answer: 'it is a place where you can show case the items you sell and can deliver,every physical product is arranged into different categories' },
  { question: "why can't i withdraw my money after user makes an order?", answer: 'you get paid when user coonfirms delivery' },
  { question: "what is a magnet product?", answer: 'these are digital products sold by the official magnet primary shop, it is usually accompanied by special tools like: magnet mailer,used to send emails, WA.Magnet used for whatsapp marketting e.t.c' },
  { question: "what is the alpha E shop?", answer: 'it is a place where you can show case the digital products you create which may include:E courses, videos, Books, written movies, anime , comic books e.t.c' },
  { question: "what is the alpha P shop verification about?", answer: "it is an honourary tag sent based on the magnet's algorithm, this is to confirm users to identify user's legitmacy"},
  { question: "why didn't i get up to 40% commision on sales?", answer: "Every user can promote a product as an affiliate while regular users get 20% commission on sale of magnet courses, affiliates get up to 40%, if you are an affiliate and didn't receive your 40% commision, then confirm that you are promoting a magnet course. other products not directly owned/sponsored by magnet has its own commision on sale"},
  { question: "do i get higher commision as an affiliate when promoting courses not owned by magnet?", answer: "yes"},
  { question: "what is the diffrence between an affiliate and an influencer?", answer: "they are both promoters but affiliates get paid when they make a sale while inflencers are paid immediately they are hired"},

  // Add more FAQ items as needed
];

// ...



    
    return ( 
      <>
      <AppContainer>
       <Typography variant="h1" 
       sx={{ 
        marginTop: '130px', 
        textAlign: 'center',
        justifySelf: 'center',
        fontWeight: '500',
        }}>
        Just like a magnet,
       </Typography>
       <Typography variant="h1" 
       sx={{ 
        marginTop: '5px', 
        marginBottom: '15px', 
        textAlign: 'center', 
        justifySelf: 'center',
        color: theme=> theme.palette.primary.main,
        fontWeight: '500',
        }}>
        we attract your products to buyers
       </Typography>
       <div className="responsive-flex-container" style={responsiveFlexStyle}>
       <div className="card">
       <RotatingCard 
       FrontContent= { ShopFrontInfo }
       BackContent={ ShopBackInfo }
       />
       </div>
       <div className="card">
       <RotatingCard 
       FrontContent= { eShopFrontInfo }
       BackContent={ eShopBackInfo }
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
       FrontContent= { ToolsFrontInfo }
       BackContent={ ToolsBackInfo }
       />
       </div>
       </div>

       {/* //squareCard */}
       <Typography variant="h1" sx={{ 
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
       <ReviewCarousel images={Images} />
       </div>
       <FAQComponent faqData={faqData} />
       </AppContainer>
       <ContactComponent />
       </>
     );
}
 
export default Home;