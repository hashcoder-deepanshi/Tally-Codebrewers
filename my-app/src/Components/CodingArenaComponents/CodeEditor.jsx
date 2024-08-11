import { Box, HStack, VStack } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import React, { useRef, useState } from 'react'
import LanguageSelector from '../LanguageSelector';
import { CODE_SNIPPETS } from '../language';
import TestCases from './TestCases';

const CodeEditor = () => {
    const editorRef = useRef();

    const [value, setValue] = useState("");
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
        <Box >
            <LanguageSelector language={language} onSelect={onSelect} />
                <Editor height="42vh"
                    theme='vs-dark'
                    language={language}
                    defaultValue={CODE_SNIPPETS[language]}
                    onMount={onMount}
                    value={value}
                    onChange={(value) => setValue(value)}
                />
                <TestCases editorRef={editorRef} language={language}/>
        </Box>
    )
}

export default CodeEditor;
