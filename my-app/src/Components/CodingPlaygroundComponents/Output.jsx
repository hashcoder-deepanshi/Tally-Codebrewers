import { Box, Button, Text, Textarea, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

const Output = ({ editorRef, language }) => {
    const toast = useToast();
    const [output, setOuput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [input, setInput] = useState(''); // State to hold user input

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language, sourceCode, input }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setOuput(result.output.split("\n"));
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "An error occurred.",
                description: error.message || "Unable to run code",
                status: "error",
                duration: 1000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg">Input</Text>
            <Textarea
                mb={4}
                placeholder="Enter input for your code here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Text mb={2} fontSize="lg">Output</Text>
            <Button variant='outline' colorScheme="green" mb={4} isLoading={isLoading} onClick={runCode}>
                Run Code
            </Button>
            <Box
                height="50vh"
                p={2}
                color={isError ? "red.400" : ""}
                border='1px solid'
                borderRadius={4}
                borderColor={isError ? "red.400" : "#333"}>
                {output ? output.map((line, i) => <Text key={i}>{line}</Text>) : "Click Run to see the output here"}
            </Box>
        </Box>
    );
};

export default Output;
