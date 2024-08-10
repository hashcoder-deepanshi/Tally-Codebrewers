import React from 'react';
import { Box, Flex, Text, Link, HStack } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="gray.800" color="white" px={4} py={2}>
      <Flex align="center" justify="space-between">
        <Text fontSize="lg" fontWeight="bold">
          MyApp
        </Text>
        <HStack
          spacing={6}
          display={{ base: 'none', md: 'flex' }} // Show only on desktop
          align="center"
        >
          <Link to="/play" fontSize="md" _hover={{ textDecoration: 'underline' }}>
            Playground
          </Link>
          <Link href="/arena" fontSize="md" _hover={{ textDecoration: 'underline' }}>
            Arena
          </Link>
          <Link href="/battleground" fontSize="md" _hover={{ textDecoration: 'underline' }}>
            Battleground
          </Link>
          <Link href="/contribute" fontSize="md" _hover={{ textDecoration: 'underline' }}>
            Contribute
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
