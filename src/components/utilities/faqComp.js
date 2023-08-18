import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography,useMediaQuery, Button  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Translate } from '@mui/icons-material';

const FAQComponent = ({ faqData }) => {
  const [expanded, setExpanded] = useState('panel0');
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <>
    <Typography variant='h2'> Frequently asked questions </Typography>
      {faqData.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleAccordionChange(`panel${index}`)}
          sx={{ 
            borderRadius: '5px', 
            [isMobile ? 'width' : 'width']: { sm: '100%', md: '70%'},
        }}
        >
          <AccordionSummary 
          expandIcon={expanded === `panel${index}` ? <RemoveIcon /> : <AddIcon />}
          sx={{
            background: expanded === `panel${index}` ?theme=> theme.palette.secondary.main : '',
            color: expanded === `panel${index}` ?theme=> theme.palette.background.default : theme=> theme.palette.text.primary,
        }}
          >
            <Typography variant="h3" 
               >{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='h4' 
            sx={{ 
                fontWeight: '300',
            }}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    
    {/* typography */}
<Typography variant='h2' 
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
  
    </>
  );
};

export default FAQComponent;
