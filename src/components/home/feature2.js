import React from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import styled from 'styled-components';

const SectionContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.inverted ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: space-between;
  background: ${props => (props.inverted ? '#f5f5f5' : '')};
  margin: 50px 0px;

  .text-content {
    padding: 40px;
  }

  .image-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 50%;
    height: 100%
  }

  img {
    height: auto;
    max-width: 100%;
    border-radius: 20px
  }

  button {
    background-color: #ff7a47;
    color: white;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px; /* Increase font size */
    border: none;
    border-radius: 20px; 
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #00529B; 
  }
`;

const LandingPageSection = ({ caption, description, buttonText, imageUrl, inverted }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <SectionContainer inverted={inverted}>
      <div className="text-content">
        <Typography variant="h4" gutterBottom sx={{color: theme=> theme.palette.text.secondary}}>
          {caption}
        </Typography>
        <Typography variant="body1" paragraph sx={{color: theme=> theme.palette.text.secondary}}>
          {description}
        </Typography>
        <button>{buttonText}</button>
      </div>
      <div className="image-content">
        {isMobile? '' : <img src={imageUrl} alt="Landing Page" />}
      </div>
    </SectionContainer>
  );
};

export default LandingPageSection;
