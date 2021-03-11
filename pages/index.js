import { Box, Button, Text, Container, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useAuth } from '../lib/AuthProvider';
import { useRouter } from 'next/router';

export default function IndexPage() {
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
            <Box mt="6">
              <Button
                size="lg"
                colorScheme="teal"
                onClick={() => auth.signinWithGoogle().then(() => router.push('home'))}
              >
                Let's Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
