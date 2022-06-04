import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Compiler.css";

const Compiler = () => {
    const [state, setState] = useState({
        input: localStorage.getItem("input") || ``,
        output: ``,
        language_id: localStorage.getItem("language_Id") || 54,
        user_input: ``,
    });

    const input = (e) => {
        e.preventDefault();
        setState({ ...state, input: e.target.value });
        localStorage.setItem("input", e.target.value);
    };

    const userInput = (e) => {
        e.preventDefault();
        setState({ ...state, user_input: e.target.value });
    };

    const language = (e) => {
        e.preventDefault();
        setState({ ...state, language_id: e.target.value });
        localStorage.setItem("language_Id", e.target.value);
    };

    const runCode = async (e) => {
        e.preventDefault();
        toggleRunner(1);
        let outputText = document.getElementById("output");
        outputText.innerHTML = "";
        outputText.innerHTML += "Creating Submission ...\n";
        const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
                accept: "application/json",
            },
            body: JSON.stringify({
                language_id: state.language_id,
                source_code: state.input,
                stdin: state.user_input,
            }),
        });

        outputText.innerHTML += "Submission Created ...\n";
        const jsonResponse = await response.json();
        let jsonGetSolution = {
            status: { description: "Queue" },
            stderr: null,
            compile_output: null,
        };

        while (
            jsonGetSolution.status.description !== "Accepted" &&
            jsonGetSolution.stderr == null &&
            jsonGetSolution.compile_output == null
        ) {
            outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
            if (jsonResponse.token) {
                let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
                const getSolution = await fetch(url, {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
                        "content-type": "application/json",
                    },
                });
                jsonGetSolution = await getSolution.json();
            }
        }
        if (jsonGetSolution.stdout) {
            const output = atob(jsonGetSolution.stdout);
            outputText.innerHTML = "";
            outputText.innerHTML += `${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
        } else if (jsonGetSolution.stderr) {
            const error = atob(jsonGetSolution.stderr);
            outputText.innerHTML = "";
            outputText.innerHTML += `\n Error :${error}`;
        } else {
            const compilation_error = atob(jsonGetSolution.compile_output);
            outputText.innerHTML = "";
            outputText.innerHTML += `\n Error :${compilation_error}`;
        }
    };
    const toggleRunner = (flag) => {
        const color = "#f7f7f7";
        const white = "#fff";
        const show = "result-show";
        const hide = "result-hide";
        const border = "1px solid #f0f0f0";
        const noBorder = "none";
        const input = document.querySelector("#input");
        const output = document.querySelector("#output");
        const showTestCase = document.querySelector("#show-testcase");
        const showOutput = document.querySelector("#show-output");
        if (flag) {
            output.classList.add(show);
            output.classList.remove(hide);
            showOutput.style.background = white;
            input.classList.add(hide);
            input.classList.remove(show);
            showTestCase.style.background = color;
            showTestCase.style.borderBottom = border;
            showOutput.style.borderBottom = noBorder;
        } else {
            output.classList.add(hide);
            output.classList.remove(show);
            showOutput.style.background = color;
            input.classList.add(show);
            input.classList.remove(hide);
            showTestCase.style.background = white;
            showOutput.style.borderBottom = border;
            showTestCase.style.borderBottom = noBorder;
        }
    };

    return (
        <div className="compiler-container">
            <div className="code-language">
                <select
                    value={state.language_id}
                    onChange={language}
                    id="tags"
                    className="form-control form-inline mb-2 language"
                >
                    <option value="54">C++</option>
                    <option value="50">C</option>
                    <option value="62">Java</option>
                    <option value="71">Python</option>
                </select>
            </div>
            <div className="compiler-main-container">
                <div className="code-compiler">
                    <textarea
                        required
                        name="solution"
                        id="source"
                        onChange={input}
                        className=" source"
                        value={state.input}
                    ></textarea>
                </div>
                <div className="code-runner">
                    <div className="code-runner-btn">
                        <button onClick={() => toggleRunner(0)} id="show-testcase">
                            Test Case
                        </button>
                        <button onClick={() => toggleRunner(1)} id="show-output">
                            Code Run Result
                        </button>
                        <div id="rem"></div>
                    </div>
                    <div className="code-result">
                        <div className="text-area">
                            <textarea
                                className="result-show"
                                id="input"
                                onChange={userInput}
                            ></textarea>
                            <textarea readOnly className="result-hide" id="output"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="run-code">
                <button type="submit" className="run-code-btn" onClick={runCode}>
                    Run Code
                </button>
            </div>
        </div>
    );
};

export default Compiler;
