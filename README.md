# Tally Codebrewers
 The Code Execution Platform is a web application designed to allow users to write, run, and test code in various programming languages directly from their browser. 

# **Code Execution Platform**

## **Description**

The Code Execution Platform is a web-based application that allows users to write, run, and test code in various programming languages directly from their browser. It features a clean and interactive user interface where users can input code, specify the programming language, and provide custom input for execution.

The platform is powered by a backend that uses the Piston API for executing code in a secure and isolated environment. The Piston API supports multiple programming languages, enabling users to run code in languages such as JavaScript, Python, C++, and more. Firebase is used for backend services like database and authentication, ensuring real-time data handling and secure user management.

## **Features**

- **Multi-Language Support**: Execute code in various programming languages including JavaScript, Python, C++, and more.
- **Real-Time Feedback**: View the output or errors of your code execution instantly.
- **Interactive Input**: Provide custom input for your code to handle and test different scenarios.
- **Secure Execution**: Code is executed in an isolated environment via the Piston API, ensuring safe and controlled execution.
- **Firebase Integration**: Leverage Firebase for real-time database management and user authentication.

## **Tech Stack**

- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **Chakra UI**: A simple, modular, and accessible component library for React.
  
- **Backend**:
  - **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
  - **Express**: A minimal and flexible Node.js web application framework.
  - **Piston API**: An API that allows executing code in a variety of programming languages in a secure environment.
  - **Firebase**: Provides backend services such as real-time database and authentication.

## **Getting Started**

### **Prerequisites**

- Node.js and npm installed on your machine.
- An API key for the Piston API (if required).
- Firebase project set up with appropriate configurations.

### **Installation**

1. Clone the repository:

    ```bash
    git clone https://github.com/hashcoder-deepanshi/tally-codebrewers.git
    cd code-execution-platform
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up Firebase:

    - Create a Firebase project and add the Firebase configuration to your project.
    - Initialize Firebase in your application by adding the Firebase SDK and configuration details.

4. Start the development server:

    ```bash
    npm run dev
    ```

5. The React app will start on `http://localhost:5173` and the Express server on `http://localhost:3000`.

### **Configuration**

- **Vite Proxy Configuration**: The frontend uses a proxy configuration to forward API requests to the backend server running on port 3000. This is set up in the `vite.config.js` file.

- **Firebase Configuration**: Make sure to initialize Firebase in your application and configure it for real-time database management and authentication.

- **Piston API Integration**: The backend uses the Piston API to execute code. Ensure the API is properly configured in your server code.

### **Usage**

- Navigate to `http://localhost:5173` to access the platform.
- Input your code, select the language, provide any necessary input, and run the code to see the output.
- User authentication and data storage are managed via Firebase.

## **Contributing**

Contributions are welcome! Feel free to submit a pull request or open an issue to discuss improvements.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding!
