import React, { useState } from 'react';
import { Box, FormControl, InputGroup, Input, Button, InputRightAddon } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { useChannel } from '@/hooks/useChannel';
import { useAuth } from './AuthProvider';
import ChatBox from './ChatBox';

export default function Chat({ channelName, ...rest }) {
  const { user } = useAuth();
  const [messageText, setMessageText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const [channel, ably] = useChannel(channelName, ({ data: { messageText, user } }) => {
    const history = chatHistory.slice(-50);
    const newMessage = { messageText, user };
    setChatHistory([...history, newMessage]);
  });

  const sendChatMessage = (messageText) => {
    channel.publish({
      name: 'new-message',
      data: { messageText, user: { email: user?.email, name: user?.displayName } },
    });
    setMessageText('');
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      alert('you need to be logged in');
      return;
    }
    sendChatMessage(messageText);
  };

  // const handleKeyPress = (event) => {
  //   if (event.charCode !== 13 || messageTextIsEmpty) {
  //     return;
  //   }
  //   sendChatMessage(messageText);
  //   event.preventDefault();
  // };

  // const messages = chatHistory.map((message, index) => {
  //   const author = message.user?.email === user?.email ? 'me' : 'other';
  //   return <span key={index}>{message.messageText + author}</span>;
  // });

  return (
    <Box>
      <ChatBox messages={chatHistory} />
      {/* <Box>{messages}</Box> */}
      <Box as="form" onSubmit={onFormSubmit}>
        <FormControl id="text">
          <InputGroup>
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="write your message here!"
            ></Input>
            <InputRightAddon>
              <Button type="submit" variant="ghost">
                <ArrowUpIcon />
              </Button>
            </InputRightAddon>
          </InputGroup>
        </FormControl>
      </Box>
    </Box>
  );
}
