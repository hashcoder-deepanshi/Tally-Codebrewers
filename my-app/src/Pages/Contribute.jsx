import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Heading,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

const Contribute = () => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [examples, setExamples] = useState("");

  const handleSubmit = () => {
    console.log({
      title,
      topic,
      description,
      constraints,
      examples,
    });
  };

  return (
    <Box
      bg="gray.800"
      color="white"
      minHeight="100vh"
      p={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="gray.700"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        w="100%"
        maxW="800px"
      >
        <Heading as="h1" mb={6} fontSize="2xl" textAlign="center">
          Add New Problem
        </Heading>
        <VStack spacing={6}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter the problem title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
          </FormControl>

          <FormControl id="topic" isRequired>
            <FormLabel>Topic</FormLabel>
            <Select
              placeholder="Select topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            >
              <option value="arrays">Arrays</option>
              <option value="strings">Strings</option>
              <option value="graphs">Graphs</option>
              <option value="dp">Dynamic Programming</option>
            </Select>
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter the problem description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
          </FormControl>

          <FormControl id="constraints" isRequired>
            <FormLabel>Constraints</FormLabel>
            <Textarea
              placeholder="Enter the constraints"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
          </FormControl>

          <FormControl id="examples" isRequired>
            <FormLabel>Examples</FormLabel>
            <Textarea
              placeholder="Enter examples"
              value={examples}
              onChange={(e) => setExamples(e.target.value)}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
          </FormControl>

          <HStack w="100%" justifyContent="center">
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              size="lg"
              w="full"
            >
              Submit
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Contribute;
