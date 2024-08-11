import { Box, Flex, Heading, Text, VStack, Button } from '@chakra-ui/react';

function LandingPage() {
  return (
    <Box bg="gray.900" color="gray.50" minH="100vh">
      {/* Hero Section */}
      <Flex
        align="center"
        justify="center"
        h="55vh"
      >
        <VStack spacing={6}>
          <Heading as="h1" size="2xl" textShadow="0px 4px 6px rgba(0, 0, 0, 0.5)">
            Welcome to Code It Here
          </Heading>
          <Text fontSize="xl" textShadow="0px 2px 4px rgba(0, 0, 0, 0.5)">
            Unleash your coding potential with our interactive coding platform.
          </Text>
        </VStack>
      </Flex>

      {/* Features Section */}
      <Box py={10} px={8}>
        <Heading mb={12} textAlign="center">Explore Our Features</Heading>
        <Flex justify="space-around">
          <Box w="45%" bg="gray.800" p={8} borderRadius="md" boxShadow="lg" _hover={{ boxShadow: "xl" }}>
            <Heading size="lg" mb={4}>Coding Playground</Heading>
            <Text fontSize="md">
              The Coding Playground is your personal space to experiment, learn, and grow. Write code, debug, and see real-time results in an interactive environment. Whether you're a beginner or an experienced coder, this is the perfect place to hone your skills.
            </Text>
          </Box>
          <Box w="45%" bg="gray.800" p={8} borderRadius="md" boxShadow="lg" _hover={{ boxShadow: "xl" }}>
            <Heading size="lg" mb={4}>Coding Arena</Heading>
            <Text fontSize="md">
              Step into the Coding Arena, where you can compete with other coders in real-time challenges. Test your skills, solve problems, and climb the leaderboard. Whether you're in it for fun or to prove yourself, the arena is the place to be.
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Call to Action Section */}
      <Box py={16} textAlign="center" bg="gray.800">
        <Heading mb={4}>Ready to Get Started?</Heading>
        <Flex justify="center">
          <Button colorScheme="blue" mr={4}>Sign Up</Button>
          <Button colorScheme="gray">Learn More</Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default LandingPage;
