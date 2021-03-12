import { useState } from 'react';
import { Box, Button, FormControl, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

export default function MessageForm({ handleSubmit }) {
  const [messageText, setMessageText] = useState('');

  return (
    <Box as="form" onSubmit={handleSubmit}>
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
  );
}
