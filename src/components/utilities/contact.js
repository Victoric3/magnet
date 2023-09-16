import React from 'react';
import { Typography, Link, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import logo from '../../img/magnet-logo-org.png';
import title from '../../img/magnet brand title.png'
import './contact.css';

const ContactComponent = () => {
  return (
    <div className='contactWrapper'>
            <Divider className='DividerHori2' orientation="Horizontal" flexItem />
      <div className="ContactContent">
          <div className="QuickLinks">
            <Typography variant="h5">Quick Links</Typography>
            <ul>
              <li>
                <Link sx={{textDecoration: 'none', color: 'white'}} href="/about">Terms & conditions</Link>
                <Link sx={{textDecoration: 'none', color: 'white'}} href="/about">About Us</Link>
                <Link sx={{textDecoration: 'none', color: 'white'}} href="/about">Tools</Link>
                <Link sx={{textDecoration: 'none', color: 'white'}} href="/about">Contact us</Link>
                <Link sx={{textDecoration: 'none', color: 'white'}} href="/about">Privacy policy</Link>
              </li>
            </ul>
        </div>
        <Divider className='Divider' orientation="vertical" flexItem />
        <div className='imgFlex'>
        <img src={logo} alt='logo' className='logo'/>
        <img src={title} alt='title' className='title'/>
        <Typography>Reach out to us on the faq page, our personel will answer your inquiries</Typography>
        </div>
        <Divider className='Divider' orientation="vertical" flexItem />
        <div className='contactUs'>
          <Typography variant="h5">Contact Us</Typography>
        <div className="SocialMediaContainer">
          <Facebook />
          <Twitter />
          <Instagram />
          <LinkedIn />
        </div>
        </div>
    </div>
    <Divider className='DividerHori2' orientation="Horizontal" flexItem />
    <Divider className='DividerHori' orientation="Horizontal" flexItem />
      <div className="CopyrightContainer">
        <Typography variant="body1">&copy; {new Date().getFullYear()} alphamagnet3. All rights reserved.</Typography>
      </div>
    </div>
  );
};

export default ContactComponent;
