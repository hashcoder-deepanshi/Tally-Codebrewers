import React, { useState, useEffect } from 'react';
import { Box, Text, Badge, Flex, VStack, HStack , Link} from '@chakra-ui/react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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
      <Box
        m = {20}
        bg="gray.700"
        borderRadius="md"
        p={5}
        boxShadow="xl"
      >
        <VStack spacing={4} align="stretch">
          {problems.map(({ id, Title, Diff, topic }, index) => (
            <Box
              key={id}
              bg={index % 2 === 0 ? "gray.600" : "gray.500"}
              p={4}
              borderRadius="md"
              boxShadow="md"
            >
              <Flex justifyContent="space-between" alignItems="center">
              <Link href={"/problemdesc/"+id} fontSize="md" _hover={{ textDecoration: 'underline' }}>
<Text fontWeight="bold" color="white">{Title}</Text></Link>
                <HStack>
                  <Badge colorScheme={Diff === "Easy" ? "green" : Diff === "Medium" ? "yellow" : "red"}>
                    {Diff}
                  </Badge>
                  <Text color="gray.300">{topic}</Text>
                </HStack>
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default ProblemList;
