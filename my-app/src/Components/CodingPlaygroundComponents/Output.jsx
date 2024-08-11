import {
    Box,
    Button,
    Text,
    Textarea,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Stack,
    Divider
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { executeCode } from '../../api';

const Output = ({ editorRef, language }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure(); // For modal
    const [output, setOuput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [input, setInput] = useState(''); // State to hold user input
    const [metrics, setMetrics] = useState({ executionTime: 'N/A', memoryUsage: 'N/A' }); // Metrics state

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const { run, executionTime, memoryUsage } = await executeCode(language, sourceCode, input);
            
            setOuput(run.output.split("\n"));
            run.stderr ? setIsError(true) : setIsError(false);
    
            // Set metrics
            setMetrics({
                executionTime: executionTime,
                memoryUsage: memoryUsage,
            });
    
            // Log execution time to the console
            console.log(`Execution Time: ${executionTime}`);

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

    return (
        <Box w="50%" p={4} bg="gray.800" borderRadius="md" boxShadow="lg">
            <Text mb={2} fontSize="lg" color="white">Input</Text>
            <Textarea
                mb={4}
                placeholder="Enter input for your code here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                bg="gray.700"
                color="white"
                _placeholder={{ color: "gray.400" }}
            />
            <Text mb={2} fontSize="lg" color="white">Output</Text>
            <Button variant='solid' colorScheme="green" mb={4} isLoading={isLoading} onClick={runCode}>
                Run Code
            </Button>
            <Button variant='outline' colorScheme="blue" mb={4} ml={2} onClick={onOpen}>
                See Metrics
            </Button>
            <Box
                height="50vh"
                p={4}
                color={isError ? "red.400" : "white"}
                bg="gray.700"
                border='1px solid'
                borderRadius={4}
                borderColor={isError ? "red.400" : "#333"}
                overflowY="auto"
            >
                {output ? output.map((line, i) => <Text key={i}>{line}</Text>) : "Click Run to see the output here"}
            </Box>

            {/* Modal for Metrics */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="gray.800" color="white">
                    <ModalHeader>Code Metrics</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <Stat>
                                <StatLabel>Runtime</StatLabel>
                                <StatNumber>{metrics.executionTime} </StatNumber>
                                <StatHelpText>Time taken to execute the code</StatHelpText>
                            </Stat>
                            <Divider />
                            <Stat>
                                <StatLabel>Memory</StatLabel>
                                <StatNumber>{metrics.memoryUsage} KB</StatNumber>
                                <StatHelpText>Memory allocated during execution</StatHelpText>
                            </Stat>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Output;
