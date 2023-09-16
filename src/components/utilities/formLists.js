
const CurrencyMapping ={
    "Nigerian Naira": "₦",
    "United States Dollar": "$",
    "Euro": "€",
    "British Pound Sterling": "£",
    "South African Rand": "R",
    "Kenyan Shilling": "KSh",
    "Ghanaian Cedi": "₵",
    "Ugandan Shilling": "UGX",
    "Rwandan Franc": "FRw",
    "Tanzanian Shilling": "TSh",
    "Zambian Kwacha": "ZK",
    "Mauritian Rupee": "Rs",
    "Moroccan Dirham": "د.م.",
    "Egyptian Pound": "ج.م.",
    "Canadian Dollar": "$",
    "Australian Dollar": "$",
    "Indian Rupee": "₹",
    "Chinese Yuan": "¥",
    "Japanese Yen": "¥"}
  
const Currencies =[
    "Nigerian Naira",
    "United States Dollar",
    "Euro",
    "British Pound Sterling",
    "South African Rand",
    "Kenyan Shilling",
    "Ghanaian Cedi",
    "Ugandan Shilling",
    "Rwandan Franc",
    "Tanzanian Shilling",
    "Zambian Kwacha",
    "Mauritian Rupee",
    "Moroccan Dirham",
    "Egyptian Pound",
    "Canadian Dollar",
    "Australian Dollar",
    "Indian Rupee",
    "Chinese Yuan",
    "Japanese Yen"
  ];
  const shopTypeList = ['Eshop', 'Pshop'];
      const pShopCategoryList = [
        "Accessories & Jewelry",
        "Art & Craft Supplies",
        "Automotive & Tools",
        "Baby & Kids",
        "Beauty & Personal Care",
        "Books & Stationery",
        "Clothing & Fashion",
        "Electronics & Gadgets",
        "Fitness Equipment",
        "Food & Grocery",
        "Furniture & Decor",
        "Games & Puzzles",
        "Gardening Supplies",
        "Health & Wellness",
        "Home & Living",
        "Kitchen & Dining",
        "Music & Instruments",
        "Outdoor Gear",
        "Party & Event Supplies",
        "Pet Supplies",
        "Shoes & Footwear",
        "Sports & Outdoors",
        "Toys & Games",
        "Travel & Luggage",
        "Watches & Accessories",
        "Wedding & Bridal",
        "Wine & Spirits",
        "Workout Apparel",
        "Yoga & Meditation",
        "Zoo & Animal Supplies",
      ]
      const eShopCategoryList = [
        
          "Art & Design",
          "Business & Finance",
          "Cooking & Recipes",
          "Crafting & DIY",
          "Education & E-Learning",
          "Entertainment & Media",
          "Fitness & Health",
          "Graphic Design",
          "Home & Interior Design",
          "Language Learning",
          "Marketing & Advertising",
          "Music & Audio",
          "Online Courses",
          "Photography & Videography",
          "Programming & Coding",
          "Software & Apps",
          "Social Media Templates",
          "Stock Photos & Videos",
          "Web Development",
          "Writing & Publishing",
          "Ebooks & Audiobooks",
          "Printable Templates",
          "Virtual Events & Conferences",
          "Webinars & Workshops",
          "Digital Art & Illustration",
          "Game Development",
          "Mobile Apps",
          "Website Themes & Templates",
          "Video Editing & Effects",
          "Digital Patterns & Designs",
        ]
        const deliveryList = [
          'intra-state',
          'inter-state',
          'worldwide'
        ]
        const returnPolicyList = [
          'No guarantee',
          '5-day guarantee',
          '10-day guarantee',
          '15-day guarantee',
          '30-day guarantee',
          '2months guarantee',
          '3months guarantee',
          '6months guarantee',
          '1-year guarantee',
          '2-year guarantee',
          '5-year guarantee',

      ]

  module.exports ={
    CurrencyMapping,
    Currencies,
    deliveryList,
    eShopCategoryList,
    pShopCategoryList,
    shopTypeList,
    returnPolicyList
  }