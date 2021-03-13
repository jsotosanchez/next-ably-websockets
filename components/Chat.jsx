import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useChannel } from '@/hooks/useChannel';
import { useAuth } from './AuthProvider';
import ChatBox from './ChatBox';
import { ABLY_NEW_MESSAGE } from '../constants';
import MessageForm from './MessageForm';

export default function Chat({ channelName }) {
  const { user, signinWithGoogle } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatHistory, setChatHistory] = useState([]);

  const callbackOnMessage = ({ data: { messageText, user } }) => {
    const history = chatHistory.slice(-50);
    const newMessage = { messageText, user };
    setChatHistory([...history, newMessage]);
  };

  // const callbackGetHistory = ({ items }) => {
  //   console.log('items on history', items);
  //   const oldMessages = items.map(({ data: { messageText, user } }) => ({ messageText, user }));
  //   setChatHistory([...oldMessages]);
  // };

  const [channel] = useChannel(channelName, callbackOnMessage);

  const sendChatMessage = (messageText) => {
    channel.publish({
      name: ABLY_NEW_MESSAGE,
      data: { messageText, user: { email: user?.email, name: user?.displayName } },
    });
  };

  const onFormSubmit = (event, message) => {
    event.preventDefault();
    if (!user) {
      onOpen();
      return;
    }
    if (!message) {
      return;
    }

    sendChatMessage(message);
  };

  return (
    <Box>
      <ChatBox messages={chatHistory} />
      <MessageForm handleSubmit={onFormSubmit} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Not too fast!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>You need to sign in to participate in the chat</ModalBody>
          <ModalFooter>
            <Button colorScheme="whatsapp" mr={3} onClick={onClose}>
              No, thanks.
            </Button>
            <Button variant="ghost" onClick={() => signinWithGoogle().then(onClose())}>
              Sign me in!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
