import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors()); // Add this line to enable CORS
app.use(express.json());


const executeCodeLocally = (language, sourceCode) => {
    return new Promise((resolve, reject) => {
        let command;

        switch (language) {
            case "javascript":
                command = `node -e "${sourceCode.replace(/"/g, '\\"')}"`;
                break;
            case "python":
                const tempPythonFile = "temp.py";
                fs.writeFileSync(tempPythonFile, sourceCode);
                command = `python ${tempPythonFile}`;
                break;
            case "cpp":
                const tempCppFile = "temp.cpp";
                const outputFile = "temp.out";
                fs.writeFileSync(tempCppFile, sourceCode);
                command = `g++ ${tempCppFile} -o ${outputFile} && ./${outputFile}`;
                break;
            default:
                reject(new Error(`Unsupported language: ${language}`));
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(stderr || error.message);
            } else {
                resolve(stdout || stderr);
            }
        });
    });
};

app.post("/execute", async (req, res) => {
     
    const { language, sourceCode } = req.body;

    try {
        const output = await executeCodeLocally(language, sourceCode);
        res.json({ output });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});