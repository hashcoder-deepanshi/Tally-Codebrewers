import React, { useState } from 'react';
import { Box, Flex, Text, Divider, Button, Textarea, VStack, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'; // Chakra UI icon for close button

const TestCases = () => {
  const initialExamples = [
    {
      id: 1,
      inputText: '[2, 7, 11, 15], target = 9',
      outputText: '[0, 1]',
    },
    {
      id: 2,
      inputText: '[3, 2, 4], target = 6',
      outputText: '[1, 2]',
    },
    {
      id: 3,
      inputText: '[3, 3], target = 6',
      outputText: '[0, 1]',
    },
  ];

  const [examples, setExamples] = useState(initialExamples);
  const [activeTestCaseId, setActiveTestCaseId] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [customOutput, setCustomOutput] = useState('');
  
  const handleAddCustomTestCase = () => {
    const newTestCase = {
      id: examples.length + 1,
      inputText: customInput,
      outputText: customOutput,
    };
    setExamples([...examples, newTestCase]);
    setCustomInput('');  // Clear input fields
    setCustomOutput('');
    setActiveTestCaseId(examples.length);  // Set the new test case as active
  };

  const handleRemoveTestCase = (id) => {
    setExamples(examples.filter(example => example.id !== id));
    // Reset activeTestCaseId if the removed case was active
    if (activeTestCaseId >= examples.length - 1) {
      setActiveTestCaseId(Math.max(0, examples.length - 2));
    }
  };

  return (
    <Box w="100%" px={5} overflow="auto" bg="gray.800">
      {/* Testcase heading */}
      <Flex h="40px" alignItems="center" spaceX={6}>
        <Flex
          h="100%"
          flexDir="column"
          justifyContent="center"
          cursor="pointer"
          position="relative"
        >
          <Text fontSize="sm" fontWeight="medium" color="white">
            Testcases
          </Text>
          <Divider position="absolute" bottom="0" h="2px" w="100%" bg="white" />
        </Flex>
      </Flex>

      <Flex mb={4}>
        {examples.map((example, index) => (
          <Flex
            key={example.id}
            mr={2}
            mt={2}
            alignItems="center"
            cursor="pointer"
          >
            <Box
              fontWeight="xs"
              display="inline-flex"
              bg={activeTestCaseId === index ? "gray.700" : "gray.800"}
              color={activeTestCaseId === index ? "white" : "gray.500"}
              rounded="lg"
              px={4}
              py={1}
              transition="all 0.2s"
              onClick={() => setActiveTestCaseId(index)}
            >
         <Text fontSize="sm" fontWeight="small" color="white">
            Case {index+1}
          </Text>            
        </Box>
            <IconButton
              aria-label="Remove testcase"
              icon={<CloseIcon />}
              size="sm"
              colorScheme="gray.800"
              onClick={() => handleRemoveTestCase(example.id)}
            />
          </Flex>
        ))}
        <Button
          onClick={handleAddCustomTestCase}
          colorScheme="blue"
          ml={2}
        >
          Add Testcase
        </Button>
      </Flex>

      {examples[activeTestCaseId] && (
        <Box fontWeight="semibold" my={4}>
          <Text fontSize="sm" fontWeight="medium" mt={4} color="white">
            Input:
          </Text>
          <Textarea
            value={examples[activeTestCaseId].inputText}
            onChange={(e) => {
              const updatedExamples = [...examples];
              updatedExamples[activeTestCaseId].inputText = e.target.value;
              setExamples(updatedExamples);
            }}
            bg="gray.700"
            color="white"
            _placeholder={{ color: 'gray.500' }}
            height="auto" // Height for single line
            resize="none" // Disable resizing
          />

          <Text fontSize="sm" fontWeight="medium" mt={4} color="white">
            Output:
          </Text>
          <Textarea
            value={examples[activeTestCaseId].outputText}
            onChange={(e) => {
              const updatedExamples = [...examples];
              updatedExamples[activeTestCaseId].outputText = e.target.value;
              setExamples(updatedExamples);
            }}
            bg="gray.700"
            color="white"
            _placeholder={{ color: 'gray.500' }}
            height="auto" // Height for single line
            resize="none" // Disable resizing
          />
        </Box>
      )}
    </Box>
  );
};

export default TestCases;


