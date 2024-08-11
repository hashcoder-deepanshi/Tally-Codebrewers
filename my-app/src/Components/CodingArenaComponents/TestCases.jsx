import React, { useState, useRef } from 'react';
import { Box, Flex, Text, Divider, Button, Input, IconButton, useToast } from '@chakra-ui/react';
import { SmallCloseIcon, AddIcon } from '@chakra-ui/icons';
import { executeCode } from '../../api';

const TestCases = ({ editorRef, language }) => {
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
  const [actualOutput, setActualOutput] = useState('');
  const [isOutputMatching, setIsOutputMatching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [output, setOutput] = useState(null);
  const toast = useToast();

  const handleSubmit = async () => {
    const sourceCode = editorRef.current.getValue();
    const activeTestCase = examples[activeTestCaseId];
    const expectedOutput = activeTestCase.outputText;

    if (!sourceCode) return;

    try {
      setIsLoading(true);

      const result = await executeCode(language, sourceCode, activeTestCase.inputText);

      if (result && result.output) {
        const actualOutput = result.output.split("\n").join("");
        setActualOutput(actualOutput);
        setIsOutputMatching(actualOutput === expectedOutput);
        setIsError(!!result.stderr);
        setOutput(result.output.split("\n"));
      } else {
        setActualOutput("No output returned");
        setIsOutputMatching(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCustomTestCase = () => {
    if (customInput.trim() && customOutput.trim()) {
      const newTestCase = {
        id: examples.length + 1,
        inputText: customInput,
        outputText: customOutput,
      };
      setExamples([...examples, newTestCase]);
      setCustomInput('');
      setCustomOutput('');
      setActiveTestCaseId(examples.length);
      console.log('Added custom test case:', newTestCase); // Debugging line
    } else {
      console.log('Custom input or output is empty'); // Debugging line
    }
  };

  const handleRemoveTestCase = (id) => {
    setExamples(examples.filter(example => example.id !== id));
    if (activeTestCaseId >= examples.length - 1) {
      setActiveTestCaseId(Math.max(0, examples.length - 2));
    }
  };

  return (
    <Box w="100%" px={5} overflow="auto" h="calc(83vh - 94px)"  bg="gray.800">
      <Flex direction="column" mb={4}>
      <Flex alignItems="center" mb={4} mt={4}>
          <Flex
            flex="1"
            alignItems="center"
            justifyContent="space-between" // Space between heading and button
          >
            <Text fontSize="md" fontWeight="medium" color="white">
              Testcases
            </Text>
            <Button
              variant="outline"
              colorScheme="green"
              size="sm" // Smaller size for the button
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Run Code
            </Button>
          </Flex>
        </Flex>

        {/* Testcases list */}
        <Flex mb={4} wrap="wrap">
          {examples.map((example, index) => (
            <Flex
              key={example.id}
              mr={1}
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
                  Case {index + 1}
                </Text>
              </Box>
              <IconButton
                aria-label="Remove testcase"
                icon={<SmallCloseIcon />}
                size="sm"
                colorScheme="gray.800"
                onClick={() => handleRemoveTestCase(example.id)}
              />
            </Flex>
          ))}
          <IconButton
            aria-label="Add testcase"
            icon={<AddIcon />}
            size="lg"
            colorScheme="gray.800"
            onClick={handleAddCustomTestCase} // Correct function reference
          />
        </Flex>
      </Flex>

      {examples[activeTestCaseId] && (
        <Box fontWeight="semibold" my={4}>
          <Text fontSize="sm" fontWeight="medium" mt={4} color="white">
            Input:
          </Text>
          <Input
            value={examples[activeTestCaseId].inputText}
            onChange={(e) => {
              const updatedExamples = [...examples];
              updatedExamples[activeTestCaseId].inputText = e.target.value;
              setExamples(updatedExamples);
            }}
            bg="gray.700"
            color="white"
            placeholder="Enter input"
            mb={4}
          />

          <Text fontSize="sm" fontWeight="medium" mt={4} color="white">
            Expected Output:
          </Text>
          <Input
            value={examples[activeTestCaseId].outputText}
            onChange={(e) => {
              const updatedExamples = [...examples];
              updatedExamples[activeTestCaseId].outputText = e.target.value;
              setExamples(updatedExamples);
            }}
            bg="gray.700"
            color="white"
            placeholder="Enter expected output"
            mb={4}
          />

          {actualOutput && (
            <Box mt={4}>
              <Text fontSize="sm" fontWeight="medium" color="white">
                Actual Output:
              </Text>
              <Box
                bg={isOutputMatching ? "green.700" : "red.700"}
                p={2}
                rounded="md"
                mt={2}
              >
                <Text color="white">{actualOutput}</Text>
              </Box>
              {!isOutputMatching && (
                <Text color="red.500" mt={2}>
                  The actual output does not match the expected output.
                </Text>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TestCases;
