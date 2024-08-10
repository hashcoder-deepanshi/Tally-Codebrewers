import { Box, HStack } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import LanguageSelector from '../Components/LanguageSelector';
import { CODE_SNIPPETS } from '../Components/language';
import Output from '../Components/CodingPlaygroundComponents/Output';

const CodingPlayground = () => {
    const editorRef = useRef();

    const [value, setValue] = useState(CODE_SNIPPETS["java"]); // Set default snippet
    const [language, setLanguage] = useState("java");

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    };

    return (
        <Box>
            <HStack spacing={4}>
                <Box w="50%">
                    <LanguageSelector language={language} onSelect={onSelect} />
                    <Editor 
                        height="85vh"
                        theme='vs-dark'
                        language={language}
                        defaultValue={CODE_SNIPPETS[language]}
                        onMount={onMount}
                        value={value}
                        onChange={(value) => setValue(value)}
                    />
                </Box>

                {/* Pass editorRef and language to Output component */}
                <Output editorRef={editorRef} language={language} />
            </HStack>
        </Box>
    );
};

export default CodingPlayground;
