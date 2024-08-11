import React,{useState, useEffect} from 'react';
import { Box, Flex, Text, IconButton, VStack, HStack, Badge } from '@chakra-ui/react';
import { AiFillLike, AiFillDislike, AiFillStar } from 'react-icons/ai';
import { TiStarOutline } from 'react-icons/ti';
import {db} from './../../firebase/firebase'
import { collection,onSnapshot,doc,updateDoc} from "firebase/firestore";
import { useParams } from 'react-router-dom';

const ProblemBox = () => {
  const [prblms, setPrblms] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [starred, setStarred] = useState(false); // State for star button
  const [examples, setExamples] = useState([]);

  const { id } = useParams();
  
  useEffect(()=>{
    const docRef=doc(db,"Problems",id);
    onSnapshot(docRef,(snapshot)=>{
      setPrblms({...snapshot.data(),id:snapshot.id});
    });

    const examplesCollection = collection(docRef, 'Examples');
    onSnapshot(examplesCollection, (snapshot) => {
      const examplesData = snapshot.docs.map(doc => doc.data());
      setExamples(examplesData);
    });

    console.log(window.location.href)
  },[]);
  
  const handleLike = async () => {
    const docRef = doc(db, "Problems", id);
    await updateDoc(docRef, {
      likes: likes + 1
    });
    setLikes(likes + 1);
  };

  const handleStar = () => {
    setStarred(prevStarred => !prevStarred); // Toggle star state
  };

  const handleDislike = async () => {
    const docRef = doc(db, "Problems", id);
    await updateDoc(docRef, {
      dislikes: dislikes + 1
    });
    setDislikes(dislikes + 1);
  };


  return (
    <Box bg="gray.800" color="white" p={4} >
    {/* TAB */}
    <Flex h="44px" w="100%" alignItems="center" pt={2} bg="gray.700" color="white" overflowX="hidden" overflowY="hidden">
      <Box bg="gray.800" borderRadius="md" px={5} py={2} textAlign="center" cursor="pointer" key={id}>
        Description
      </Box>
    </Flex>

    <Flex px={0} py={4} h="calc(120vh - 94px)" overflowY="auto">
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
              onClick={handleLike}
            />
            <Text fontSize="sm">{prblms.likes}</Text>
            <IconButton
              aria-label="Dislike"
              icon={<AiFillDislike />}
              variant="outlined"
              size="lg"
              onClick={handleDislike}
            />
            <Text fontSize="sm">{prblms.dislikes}</Text>
            <IconButton
              aria-label="Star"
              icon={starred ? <AiFillStar /> : <TiStarOutline />}
              color={starred ? "yellow.400" : "gray.500"}
              variant='outlined'
              size="lg"
              onClick={handleStar}
            />
          </HStack>

          {/* Problem Statement (paragraphs) */}
          <Box fontSize="sm" color="white" mt={4}>
            <Box dangerouslySetInnerHTML={{ __html: prblms.desc }} />
          </Box>

            {/* Examples */}
            <VStack align="start" spacing={4} mt={4}>
              {examples.map((example, index) => (
                <Box key={index}>
                  <Text fontWeight="medium" color="white">Example {index + 1}:</Text>
                  <Box p={4} bg="gray.700" borderRadius="md" mt={3}>
                    <pre>
                      <strong>Input:</strong> {example.input}
                      <br />
                      <strong>Output:</strong> {example.output}
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

