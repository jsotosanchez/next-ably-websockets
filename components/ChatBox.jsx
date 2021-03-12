import { Box, Text, Flex, useColorMode } from '@chakra-ui/react';
import { useAuth } from './AuthProvider';

const Message = ({ message, authorIsMe, senderName, colorMode, messagebg }) => (
  <>
    <Flex direction={authorIsMe ? 'row-reverse' : 'row'} p="3px" my="1px" mx="5px">
      <Box p="3px 20px 3px 20px" borderRadius="20px" background={messagebg[colorMode]}>
        {!authorIsMe && (
          <Text fontWeight="bold" fontSize="sm" color={colorMode === 'light' ? '#000000' : '#FFFFFF'}>
            {senderName}:
          </Text>
        )}
        <Text fontWeight="semibold" color={colorMode === 'light' ? '#000000' : '#FFFFFF'}>
          {message}
        </Text>
      </Box>
    </Flex>
  </>
);

export default function ChatBox({ messages }) {
  const { colorMode } = useColorMode();
  const bg = { light: '#ECE5DD', dark: 'gray.700' };
  const myMessageBG = { light: '#DCF8C6', dark: '#128C7E' };
  const otherMessageBG = { light: '#FFFFFF', dark: '#455B64' };
  const { user } = useAuth();

  return (
    <Box bg={bg[colorMode]} minH="30em" maxH="30em" overflowY="scroll">
      {messages &&
        messages.map((msg, index) => (
          <Message
            key={index}
            message={msg.messageText}
            authorIsMe={user?.email === msg.user.email}
            senderName={msg.user.name}
            colorMode={colorMode}
            messagebg={user?.email === msg.user.email ? myMessageBG : otherMessageBG}
          ></Message>
        ))}
    </Box>
  );
}
