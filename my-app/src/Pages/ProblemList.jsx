import React, { useState, useEffect } from 'react';
import { Box, Text, Badge, Flex, VStack, HStack, Link, Icon } from '@chakra-ui/react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { CheckCircleIcon } from '@chakra-ui/icons'; // Import CheckCircleIcon from Chakra UI

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const problemRef = collection(db, "Problems");
    const q = query(problemRef);
    onSnapshot(q, (snapshot) => {
      const problems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProblems(problems);
    });
  }, []);

  return (
    <Box bg="gray.800" minH="100vh" p={6}>
      {/* Heading Section */}
      <Box textAlign="center" mb={8}>
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Get Started with Problems
        </Text>
      </Box>

      <Box
        m={8}
        bg="gray.700"
        borderRadius="lg"
        p={6}
        boxShadow="2xl"
      >
        <VStack spacing={4} align="stretch">
          {/* Headings */}
          <Flex
            bg="gray.600"
            p={3}
            borderRadius="md"
            fontWeight="bold"
            color="gray.100"
            mb={4}
            align="center"
          >
            <Text w="10%" textAlign="center">Solved</Text>
            <Text w="40%" textAlign="center">Title</Text>
            <Text w="25%" textAlign="center">Difficulty</Text>
            <Text w="25%" textAlign="center">Topic</Text>
          </Flex>

          {problems.map(({ id, Title, Diff, topic, solved }, index) => (
            <Flex
              key={id}
              bg={index % 2 === 0 ? "gray.600" : "gray.500"}
              p={4}
              borderRadius="md"
              boxShadow="md"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex w="10%" justify="center">
                {solved && (
                  <Icon
                    as={CheckCircleIcon}
                    color="green.400"
                    w={5}
                    h={5}
                  />
                )}
              </Flex>
              <Link href={"/problemdesc/"+id} textAlign="center" fontSize="md" w="40%">
                <Text fontWeight="bold" color="white">{Title}</Text>
              </Link>
              <Text w="25%" textAlign="center" color="gray.300">
                <Badge colorScheme={Diff === "Easy" ? "green" : Diff === "Medium" ? "yellow" : "red"}>
                  {Diff}
                </Badge>
              </Text>
              <Text w="25%" textAlign="center" color="gray.300">
                {topic}
              </Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default ProblemList;
