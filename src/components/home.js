import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return ( 
       <>
       Hi this is the home page
       go to the form through <Link to={'/form'}>Form</Link>
       
       
       
       </>
     );
}
 
export default Home;