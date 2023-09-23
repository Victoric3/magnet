import React, { useState } from 'react';
import { Container, Box, TextareaAutosize, IconButton, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { styled } from '@mui/system';
import Layout from '../utilities/layout';
import { useMediaQuery } from '@mui/material';


const StyledContainer = styled(Container)({
  padding: '5px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  height: '80vh',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f0f0f0',
  },
});

const ChatArea = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0px auto',
});

const ChatTextArea = styled(TextareaAutosize)({
  flex: 1,
  backgroundColor: '#ffffff',
  padding: '20px',
  borderTop: '1px solid #e0e0e0',
  borderRadius: '8px',
  alignSelf: 'center',
  margin: '10px auto',
  resize: 'vertical',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '12px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f0f0f0',
  },
  
});

const SendButton = styled(IconButton)({
  position: 'absolute',
  right: '12px',
  bottom: '18px',
});

const MessageBubble = styled(Box)(({ isUser }) => ({
  display: 'flex',
  justifyContent: 'end',
  marginBottom: '6px',
  wordWrap: 'break-word',
  marginLeft: isUser ? 'auto' : '0',
  background: 'transparent',
  whiteSpace: 'pre-wrap',
}));
const ReadMoreButton = styled('span')`
  cursor: pointer;
  color: blue;
`;

const ChatUI = () => {
  const MAX_DISPLAY_LENGTH = 500
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { sender: 'user', content: newMessage.trim() }]);
    setNewMessage('');

  };
  const toggleExpand = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].isExpanded = !updatedMessages[index].isExpanded;
    setMessages(updatedMessages);
  };
  

  return (
    <Layout>
      <StyledContainer>
        {messages.map((message, index) => (
          <MessageBubble 
          key={index} 
          isUser={message.sender === 'user'}
          sx={{maxWidth: isMobile ? '80%' : '60%'}}
          >
            <Typography variant='body1' sx={{  
                background: message.sender === 'user' ? '#DCF8C6' : '#ECE5DD',
                display: 'inline-block',
                padding: '8px',
                borderRadius: '5px',
              }}>
              {message.isExpanded ? message.content : message.content.slice(0, MAX_DISPLAY_LENGTH)}
                {message.content.length > MAX_DISPLAY_LENGTH && (
                  <ReadMoreButton onClick={() => toggleExpand(index)}>
                    {message.isExpanded ? ' Read Less' : ' Read More'}
                  </ReadMoreButton>
                )}
            </Typography>
          </MessageBubble>
        ))}
      </StyledContainer>
      <ChatArea sx={{ width : isMobile ? '100%' : '90%' }}>
        <ChatTextArea
          variant="filled"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          maxRows={4}
        />
        <SendButton color="primary" onClick={handleSendMessage}>
          <SendRoundedIcon />
        </SendButton>
      </ChatArea>
    </Layout>
  );
};

export default ChatUI;
