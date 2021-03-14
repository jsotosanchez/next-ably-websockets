import { Box, Button, Text, Container, Heading, Flex, Center } from '@chakra-ui/react';
import Head from 'next/head';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/router';

export default () => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Box h="100vh">
      <Head>
        <title>Co-Space</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="section" pt={40} pb={24}>
        <Container>
          <Box maxW="xl" mx="auto" textAlign="center">
            <Heading as="h1" size="xl" fontWeight="black">
              Hang out with your friends!
            </Heading>

            <Text opacity="0.7" fontSize={['sm', 'md', 'lg']} mt="6">
              Co-Space allows you to hang out with your friends just like before. Missing those pre-pandemic meet ups?
              We got you covered!
            </Text>
            <Center>
              <Flex>
                <Box mt="6" mr="3">
                  <Button
                    size="lg"
                    colorScheme="whatsapp"
                    onClick={() => auth.signinWithGoogle().then(() => router.push('home'))}
                    name="signin"
                  >
                    Sign me in!
                  </Button>
                </Box>
                <Box mt="6" ml="3">
                  <Button
                    size="lg"
                    colorScheme="whatsapp"
                    variant="ghost"
                    onClick={() => router.push('home')}
                    name="seeFirst"
                  >
                    I wanna see it first
                  </Button>
                </Box>
              </Flex>
            </Center>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
