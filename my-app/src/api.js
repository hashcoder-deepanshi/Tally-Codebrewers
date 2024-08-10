import axios from "axios";
import { LANGUAGE_VERSIONS } from "./Components/language";

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, input = "") => {
    const startTime = performance.now();

    const response = await API.post("/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
            {
                content: sourceCode,
            },
        ],
        stdin: input, // Add user input to the request
    });
    
    console.log(input);
    
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    let memoryUsage = null;
    const output = response.data.run.output;

    if (output) {
        const memoryMatch = output.match(/Peak: (\d+) bytes/);
        if (memoryMatch) {
            memoryUsage = memoryMatch[1];
        }
    }

    console.log(`${executionTime.toFixed(2)} ms`);
    console.log(`${memoryUsage} bytes`);

    // Return the results with execution time and memory usage
    return {
        ...response.data,
        executionTime: `${executionTime.toFixed(2)} ms`,
        memoryUsage: memoryUsage ? `${memoryUsage} bytes` : "N/A",
    };
};
