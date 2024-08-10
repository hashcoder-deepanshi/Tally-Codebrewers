import React,{useState, useEffect} from 'react';
import { Box, Flex, Text, IconButton, VStack, HStack, Badge } from '@chakra-ui/react';
import { AiFillLike, AiFillDislike, AiFillStar } from 'react-icons/ai';
import { TiStarOutline } from 'react-icons/ti';
import {db} from './../../firebase/firebase'
import { collection, query ,onSnapshot,arrayUnion,arrayRemove,doc,updateDoc} from "firebase/firestore";
import { useParams } from 'react-router-dom';

const ProblemBox = () => {
  const [prblms, setPrblms] = useState([]);
  const { id } = useParams();
  
  useEffect(()=>{
    const docRef=doc(db,"Problems",id);
    onSnapshot(docRef,(snapshot)=>{
      setPrblms({...snapshot.data(),id:snapshot.id});
    });
    console.log(window.location.href)
  },[]);


  const problem = {
    examples: [
      {
        id: 1,
        inputText: "nums = [2,7,11,15], target = 9",
        outputText: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        id: 2,
        inputText: "nums = [3,2,4], target = 6",
        outputText: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      },
    ],
  };

  return (
    <Box bg="gray.800" color="white" p={4} borderRadius="md">
    {/* TAB */}
    <Flex h="44px" w="100%" alignItems="center" pt={2} bg="gray.700" color="white" overflowX="hidden" overflowY="hidden">
      <Box bg="gray.800" borderRadius="md" px={5} py={2} textAlign="center" cursor="pointer" key={id}>
        Description
      </Box>
    </Flex>

    <Flex px={0} py={4} h="calc(100vh - 94px)" overflowY="auto">
      <VStack align="start" spacing={4} px={5}>
        {/* Problem heading */}
        <Box w="100%">
          <Text fontSize="lg" fontWeight="medium" color="white" mb={3}>
            {prblms.Title}
          </Text>
          <HStack spacing={1} alignItems="center">
            <Badge
              colorScheme={prblms.Diff === "Easy" ? "green" : prblms.Diff === "Medium" ? "yellow" : "red"} 
              variant="subtle"
              fontSize="xs"
              px={2.5}
              py={1}
              borderRadius="md"
            >
              {prblms.Diff}
            </Badge>
            <IconButton
              aria-label="Like"
              icon={<AiFillLike />}
              variant="outlined"
              size="lg"
            />
            <Text fontSize="sm">123</Text>
            <IconButton
              aria-label="Dislike"
              icon={<AiFillDislike />}
              variant="outlined"
              size="lg"
            />
            <Text fontSize="sm">10</Text>
            <IconButton
              aria-label="Star"
              icon={<TiStarOutline />}
              variant='outlined'
              size="lg"
            />
          </HStack>

          {/* Problem Statement (paragraphs) */}
          <Box fontSize="sm" color="white" mt={4}>
            <Box dangerouslySetInnerHTML={{ __html: prblms.desc }} />
          </Box>

          {/* Examples */}
          <VStack align="start" spacing={4} mt={4}>
            {problem.examples.map((example, index) => (
              <Box key={example.id}>
                <Text fontWeight="medium" color="white">Example {index + 1}:</Text>
                <Box p={4} bg="gray.700" borderRadius="md" mt={3}>
                  <pre>
                    <strong>Input:</strong> {example.inputText}
                    <br />
                    <strong>Output:</strong> {example.outputText}
                    {example.explanation && (
                      <>
                        <br />
                        <strong>Explanation:</strong> {example.explanation}
                      </>
                    )}
                  </pre>
                </Box>
              </Box>
            ))}
          </VStack>

          {/* Constraints */}
          <Box my={8} pb={4}>
            <Text fontSize="sm" fontWeight="medium" color="white">Constraints:</Text>
            <Box as="ul" pl={5} listStyleType="disc" color="white">
              <Box dangerouslySetInnerHTML={{ __html: prblms.constraints }} />
            </Box>
          </Box>
        </Box>
      </VStack>
    </Flex>
  </Box>
  )
};

export default ProblemBox;


