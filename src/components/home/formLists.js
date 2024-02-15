import shopImg from "../../img/shop.jpg"
import eShopImg from "../../img/E-shop.jpg"
import PromoteImg from "../../img/affiliate-marketing.png"
import ToolsImg from "../../img/tools.png"
import Shopping from '../../img/shop.jpg'
import service from '../../img/service.jpg'
import Skill from '../../img/skill.jpg'
import Investment from '../../img/investment.jpg'
import Community from '../../img/community.jpg'
import affiliate from '../../img/affiliate.jpg'

const faqData =[
    {
      question: "What is a Magnet product?",
      answer: "Magnet products refer to digital items available for purchase through the official Magnet primary shop. These products can include a variety of digital content such as E-courses, videos, books, written materials, movies, anime, comic books, and more."
    },
    {
      question: "What is the Alpha E Shop?",
      answer: "The Alpha E Shop is a platform where creators can showcase and sell their digital products. These products encompass a wide range of content, including E-courses, videos, books, written movies, anime, comic books, and more."
    },
    {
      question: "How long does it take to get verified to be able to post products?",
      answer: "The verification process for posting products is currently done manually. Users can expect to be verified within approximately one week from the date of their verification request, provided they meet the necessary requirements. An automated verification process, set to significantly speed up verifications, is scheduled to commence on February 2, 2024."
    },
    {
      question: "Why didn't I get up to 40% commission on sales?",
      answer: "While every user can promote products as an affiliate, regular users receive a 20% commission on the sale of Magnet courses. On the other hand, affiliates are eligible for commissions of up to 40%. If you are an affiliate and have not received your full 40% commission, please ensure that you are promoting a Magnet course. Other products not directly owned or sponsored by Magnet have their own commission rates on sale."
    },
    {
      question: "Do I get a higher commission as an affiliate when promoting courses not owned by Magnet?",
      answer: "Yes, affiliates receive a higher commission when promoting courses not owned by Magnet."
    },
    {
      question: "What are Alpha credits for creators?",
      answer: "Alpha credits are points earned and assigned to creators based on user performance and the quality of their products. These credits generally improve your products' SEO (Search Engine Optimization)."
    },
    {
      question: "Can I list physical products on AlphaMagnet?",
      answer: "No, AlphaMagnet only allows the sale of digital courses at the moment. Users will be informed when this window opens."
    }
  ];
  const bannerTextData = [
    {
      "title": "Shopping platform",
      "image": Shopping,
      "caption": "Like a magnet, we connect buyers and sellers",
      "description": "Do you have a product you’re proud of and want to sell to others? We provide the space to help you display your own merchandise. Our team of reliable partners will ensure that your product is delivered to the customer, connecting you with satisfied buyers."
    },
    {
      "title": "Affiliate platform",
      "image": affiliate,
      "caption": "Become a Successful Affiliate",
      "description": "Whether you're a seasoned affiliate marketer or just starting out, we are here to help you take your affiliate marketing skills to the next level. Join our program and unlock the potential to maximize your earnings."
    },
    {
        "title": "Service platform",
        "image": service,
        "caption": "Find the Perfect Freelancer for Your Project",
        "description": "Explore a vast network of talented, verified freelancers who can help you with any task. We make it easy for you to hire the best fit for your budget, deadline, and quality standards. Service has never been more convenient and affordable."
    },
    {
        "title": "Skill platform",
        "image": Skill,
        "caption": "Showcase Your Skills and Earn Money",
        "description": "Create your own profile and list your skills or gigs that you can offer to others. We make it easy for you to reach a global market of customers who are looking for your services. Skill has never been more rewarding and flexible."
    }, 
    {
        "title": "Investment platform",
        "image": Investment,
        "caption": "Boost Your Business with Capital",
        "description": "Discover a new way to access funding and grow your business. We help you list your shop on our platform, where you can attract investors who share your vision."
    },  
    {      
      "title": "Community platform",
      "image": Community,
      "caption": "Join Our Vibrant Community!",
      "description": "Connect with a dynamic community of like-minds, all dedicated to sharing knowledge and uplifting each other's success. Our platform is more than just a place to sell products — it's a space for building valuable networks, fostering collaboration, and expanding your reach. Join us in shaping the future of online retail!"
    }
  ];

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
    description1: 'Sell your personal services',
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
  
  
  export {
    faqData,
    bannerTextData,
    ShopFrontInfo,
    ShopBackInfo,
    eShopFrontInfo,
    eShopBackInfo,
    PromoteFrontInfo,
    PromoteBackInfo,
    ToolsFrontInfo,
    ToolsBackInfo,
  };