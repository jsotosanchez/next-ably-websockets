import { useChannelContext } from '@/components/ChannelProvider';
import { ChannelProvider } from '@/components/ChannelProvider';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { Box, Flex, Grid } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Chat'), { ssr: false });

export default function home() {
  return (
    <Grid h="100vh" templateRows="2">
      <Header />
      <Flex pt="1rem">
        <ChannelProvider>
          <SideBar />
          <Box flex="1">
            <Chat />
          </Box>
        </ChannelProvider>
      </Flex>
    </Grid>
  );
}
