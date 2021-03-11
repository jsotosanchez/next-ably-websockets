import { Box, Flex, IconButton, useColorMode, Button, Heading } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '@/components/AuthProvider';
export default function Header(props) {
  const { user, signinWithGoogle, signout } = useAuth();

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: 'white', dark: 'gray.800' };
  return (
    <Box
      // pos="fixed"
      as="header"
      top="0"
      zIndex="4"
      bg={bg[colorMode]}
      left="0"
      right="0"
      borderBottomWidth="1px"
      width="full"
      height="4rem"
    >
      <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
        <Flex size="100%" p={[0, 3]} pl={[0, 4]} align="center" justify="space-between">
          <Box as="a" d="block" href="/" aria-label="daydrink, Back to homepage">
            <Heading as="h5" size="lg" colorScheme="purple">
              {' '}
              Co-Space{' '}
            </Heading>
          </Box>

          <Flex align="center" color="gray.500">
            {!user ? (
              <Box>
                <Button size="sm" colorScheme="whatsapp" onClick={signinWithGoogle}>
                  Sign In
                </Button>
              </Box>
            ) : (
              <Box>
                <Button size="sm" colorScheme="whatsapp" onClick={signout}>
                  Sign Out
                </Button>
              </Box>
            )}
            <IconButton
              aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
              variant="ghost"
              colorScheme="whatsapp"
              ml="2"
              fontSize="20px"
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
