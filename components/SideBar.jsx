import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import React from 'react';
import { useChannelContext } from './ChannelProvider';

const ABLY_CHANNEL_ENTRANCE = 'entrance';
const ABLY_CHANNEL_LIVING = 'living';
const ABLY_CHANNEL_BACKYARD = 'backyard';

export default function SideBar() {
  const { channel, setChannel } = useChannelContext();
  return (
    <VStack minW="7em" h="100vh" borderBottomWidth="1px">
      <Button
        my="0.5em"
        variant={channel === ABLY_CHANNEL_ENTRANCE ? 'solid' : 'link'}
        onClick={() => setChannel(ABLY_CHANNEL_ENTRANCE)}
      >
        Entrance
      </Button>
      <Button
        my="0.5em"
        variant={channel === ABLY_CHANNEL_LIVING ? 'solid' : 'link'}
        onClick={() => setChannel(ABLY_CHANNEL_LIVING)}
      >
        Living
      </Button>
      <Button
        my="0.5em"
        variant={channel === ABLY_CHANNEL_BACKYARD ? 'solid' : 'link'}
        onClick={() => setChannel(ABLY_CHANNEL_BACKYARD)}
      >
        Backyard
      </Button>
    </VStack>
  );
}
