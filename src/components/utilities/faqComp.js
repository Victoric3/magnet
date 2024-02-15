import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography,useMediaQuery  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FAQComponent = ({ faqData }) => {
  const [expanded, setExpanded] = useState('panel0');
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <>
    <Typography variant='h5'> Frequently asked questions </Typography>
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
            <Typography variant="h5" 
               >{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='h6' 
            sx={{ 
                fontWeight: '300',
            }}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    
    {/* typography */}
  
    </>
  );
};

export default FAQComponent;
