import React, { useState } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { db } from '../firebase/firebase';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const Contribute = () => {
  const [multiformValue, setMultiformValue] = useState({
    topic: "",
    Title: "",
    desc: "",
    constraints: "",
    Diff: "",
    likes: 0,
    dislikes: 0,
    examples: [],
  });

  const [newExample, setNewExample] = useState({ input: "", output: "", explanation: "" });

  const { topic, Title, desc, constraints, Diff, likes, dislikes, examples } = multiformValue;

  const problemsCollection = collection(db, 'Problems');

  const handleAddExample = () => {
    if (newExample.input && newExample.output && newExample.explanation) {
      setMultiformValue({
        ...multiformValue,
        examples: [...examples, newExample],
      });
      setNewExample({ input: "", output: "", explanation: "" });
    }
  };

  const handleRemoveExample = (index) => {
    const updatedExamples = examples.filter((_, i) => i !== index);
    setMultiformValue({ ...multiformValue, examples: updatedExamples });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Title === "" || topic === "" || desc === "") {
      alert("Fill all the fields");
      return false;
    } else {
      try {
        // Add the problem
        const problemRef = await addDoc(problemsCollection, {
          Title,
          topic,
          desc,
          constraints,
          Diff,
          likes,
          dislikes,
        });

        // Add examples as a subcollection under the problem document
        const examplesCollection = collection(doc(db, 'Problems', problemRef.id), 'Examples');
        await Promise.all(
          examples.map(example =>
            addDoc(examplesCollection, example)
          )
        );

        alert("Success!");
      } catch (err) {
        alert(err.message);
      }
    }
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
              value={multiformValue.Title}
              onChange={(e) => setMultiformValue({ ...multiformValue, Title: e.target.value })}
              required
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
          </FormControl>

          <FormControl id="topic" isRequired>
            <FormLabel>Topic</FormLabel>
            <Select
              placeholder="Select topic"
              value={multiformValue.topic}
              onChange={(e) => setMultiformValue({ ...multiformValue, topic: e.target.value })}
              required
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            >
              <option value="arrays">Arrays</option>
              <option value="strings">Strings</option>
              <option value="graphs">Graphs</option>
              <option value="dp">Dynamic Programming</option>
            </Select>
          </FormControl>

          <FormControl id="difficulty" isRequired>
            <FormLabel>Difficulty</FormLabel>
            <Select
              placeholder="Select difficulty"
              value={multiformValue.Diff}
              onChange={(e) => setMultiformValue({ ...multiformValue, Diff: e.target.value })}
              required
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter the problem description"
              value={multiformValue.desc}
              onChange={(e) => setMultiformValue({ ...multiformValue, desc: e.target.value })}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
          </FormControl>

          <FormControl id="constraints" isRequired>
            <FormLabel>Constraints</FormLabel>
            <Textarea
              placeholder="Enter the constraints"
              value={multiformValue.constraints}
              onChange={(e) => setMultiformValue({ ...multiformValue, constraints: e.target.value })}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
          </FormControl>

          <FormControl id="examples">
            <FormLabel>Examples</FormLabel>
            {multiformValue.examples.map((example, index) => (
              <HStack key={index} spacing={4} mb={2}>
                <Box flex="1">
                  <Input
                    placeholder="Input"
                    value={example.input}
                    isReadOnly
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                  />
                </Box>
                <Box flex="1">
                  <Input
                    placeholder="Output"
                    value={example.output}
                    isReadOnly
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                  />
                </Box>
                <Box flex="1">
                  <Input
                    placeholder="Explanation"
                    value={example.explanation}
                    isReadOnly
                    bg="gray.600"
                    _hover={{ bg: "gray.500" }}
                  />
                </Box>
                <IconButton
                  aria-label="Remove example"
                  icon={<CloseIcon />}
                  onClick={() => handleRemoveExample(index)}
                  colorScheme="red"
                />
              </HStack>
            ))}

            <HStack spacing={4} mb={4}>
              <Input
                placeholder="Input"
                value={newExample.input}
                onChange={(e) => setNewExample({ ...newExample, input: e.target.value })}
                bg="gray.600"
                _hover={{ bg: "gray.500" }}
              />
              <Input
                placeholder="Output"
                value={newExample.output}
                onChange={(e) => setNewExample({ ...newExample, output: e.target.value })}
                bg="gray.600"
                _hover={{ bg: "gray.500" }}
              />
              <Input
                placeholder="Explanation"
                value={newExample.explanation}
                onChange={(e) => setNewExample({ ...newExample, explanation: e.target.value })}
                bg="gray.600"
                _hover={{ bg: "gray.500" }}
              />
              <IconButton
                aria-label="Add example"
                icon={<AddIcon />}
                onClick={handleAddExample}
                colorScheme="green"
              />
            </HStack>
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
