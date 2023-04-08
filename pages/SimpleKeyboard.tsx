import React, { useEffect, useRef, useState, useCallback } from "react";
import Keyboard from "react-simple-keyboard";
// import { checkWord } from "./dictionary"; // An example function to check if a word is valid in English

import "react-simple-keyboard/build/css/index.css";

const INITIAL_WORD = "Color".toUpperCase();

export default function SimpleKeyboard() {
    const keyboard = useRef<any | null>(null);
    const numLetters = INITIAL_WORD.length; // Set the number of letters based on the initial word length

    const [showDialog, setShowDialog] = useState(false);

    const [typedLetters, setTypedLetters] = useState<string[]>([]);
    const [rows, setRows] = useState<Array<{ letter: string; color: string }[]>>(
        []
    );
    const [attempts, setAttempts] = useState(0);

    const checkWord = async (word: string) => {
        const response = await fetch('/cleaned_word_list.txt');
        const text = await response.text();
        const words = text.split('\n');
        const lowerCaseWords = words.map(wordi => wordi.toLowerCase());

        //console.log(lowerCaseWords.length)
        //console.log(lowerCaseWords.includes(word.toLowerCase()));
        return lowerCaseWords.includes(word.toLowerCase());
    }

    const onKeyPress = (button: string) => {
        console.log("Button pressed", button);
        if (button === "{enter}") {
            handleKeyPress("Enter");
        } else if (button === "{backspaceSymbol}") {
            handleKeyPress("Backspace");
        } else {
            handleKeyPress(button);
        }
    };

    const customLayout = {
        default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "{enter} Z X C V B N M {backspaceSymbol}"
        ]
    };

    const customDisplay = {
        "{enter}": "ENTER",
        "{backspaceSymbol}": "⌫"
    };

    const closeDialog = () => {
        setShowDialog(false);
        setTypedLetters([]);
        setAttempts(0);
        setRows([]);
        keyboard.current.clearInput();
    };

    const handleKeyPress = async (key: string) => {
        if (key === "Backspace") {
            setTypedLetters(typedLetters.slice(0, -1));
        } else if (key === "Enter") {
            if (typedLetters.length === numLetters) {
                const typedWord = typedLetters.join("");
                const isWordValid = checkWord(typedWord); // check if the entered word is valid
                const newRow: { letter: string; color: string }[] = typedLetters.map(
                    (letter, index) => {
                        if (INITIAL_WORD[index] === letter) {
                            return { letter, color: "green" };
                        } else if (INITIAL_WORD.includes(letter)) {
                            // count the number of times letter appears in 
                            // INITIAL_WORD
                            const numOccurrences = INITIAL_WORD.split("").filter((item) => item === letter).length;
                            // count the number of times letter appears in
                            // typedWord so far to left index
                            const numTypedOccurrences = typedLetters
                                .slice(0, index)
                                .filter((item) => item === letter).length;
                            // find number of places where letter appears in
                            // INITIAL_WORD and typedWord in the same location
                            const numGreenOccurrences = INITIAL_WORD.split("").filter((item, index) => item === letter && item === typedWord[index]).length;
                            // number of green occurences to left of current index
                            const numGreenOccurrencesToLeft = INITIAL_WORD.split("").slice(0, index).filter((item, index) => item === letter && item === typedWord[index]).length;

                            // console.log("numOccurrences", numOccurrences);
                            // console.log("numTypedOccurrences", numTypedOccurrences);
                            // console.log("numGreenOccurrences", numGreenOccurrences);

                            // now the green occurences will always get the green color

                            // max number of yellow occurences 
                            // is numOccurrences - numGreenOccurrences
                            const maxNumYellowOccurrences = numOccurrences - numGreenOccurrences;

                            // calculate number of yellow occurences to left of current index
                            const numYellowOccurrencesToLeft = numTypedOccurrences - numGreenOccurrencesToLeft;

                            // if number of yellow occurences to left of current index
                            // is less than max number of yellow occurences, we give yellow to current index
                            if (numYellowOccurrencesToLeft < maxNumYellowOccurrences) {
                                return { letter, color: "yellow" };
                            } else {
                                return { letter, color: "red" };
                            }
                        } else {
                            return { letter, color: "red" };
                        }
                    }
                );
                if (await isWordValid) {
                    setRows([...rows, newRow]);
                    setTypedLetters([]);
                    if (newRow.every((item) => item.color === "green")) {
                        setShowDialog(true);
                    } else {
                        setAttempts(attempts + 1);
                    }
                } else {
                    setRows([...rows, newRow.map((item) => ({ ...item, color: "black" }))]);
                    setTypedLetters([]);
                    setAttempts(attempts + 1);
                }
            } else {
                setShowDialog(true);
            }
        } else {
            if (typedLetters.length < numLetters) {
                setTypedLetters([...typedLetters, key]);
            }
        }
    };

    // handleKeyDown and useEffect are used to handle
    // physical keyboard events
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const { key } = event;
            if (/^[a-zA-Z]$/.test(key)) {
                const capitalizedKey = key.toUpperCase();
                handleKeyPress(capitalizedKey);
            } else if (key === "Enter") {
                handleKeyPress("Enter");
            } else if (key === "Backspace") {
                handleKeyPress("Backspace");
            }
        },
        [typedLetters]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="keyboard-container">
            <div className="box-container">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((item, index) => (
                            <div
                                key={index}
                                className={`box ${item.color}`}
                            >
                                {item.letter === " " ? "\u00A0" : item.letter}
                            </div>
                        ))}
                    </div>
                ))}
                <div className="row">
                    {typedLetters.map((letter: string, index) => (
                        <div key={index} className="box">
                            {letter}
                        </div>
                    ))}
                    {Array(numLetters - typedLetters.length)
                        .fill(null)
                        .map((_, index) => (
                            <div key={index + typedLetters.length} className="box">
                                {" "}
                            </div>
                        ))}
                </div>
            </div>

            <div className="virtual-keyboard">
                <Keyboard
                    keyboardRef={(r) => (keyboard.current = r)}
                    layout={customLayout}
                    display={customDisplay}
                    onKeyPress={onKeyPress}
                />
            </div>
            {showDialog && (
                <div className="dialog">
                    {rows.length > 0 && (
                        <div className="dialog-content">
                            {rows[rows.length - 1].map((item, index) => (
                                <div
                                    key={index}
                                    className={`dialog-box ${item.color}`}
                                >
                                    {item.letter === " " ? "\u00A0" : item.letter}
                                </div>
                            ))}
                            {!checkWord(typedLetters.join("")) && (
                                <p>
                                    {typedLetters.join("")} is not a valid word.
                                </p>
                            )}
                            {rows[rows.length - 1].every(
                                (item) => item.color === "green"
                            ) && (
                                    <p>
                                        Solved in {attempts} attempt(s).
                                    </p>
                                )}
                            <button onClick={closeDialog}>Close</button>
                        </div>
                    )}
                    {rows.length === 0 && (
                        <div className="dialog-content">
                            <p>Type a word with {numLetters} letters and press Enter to start.</p>
                            <button onClick={closeDialog}>Close</button>
                        </div>
                    )}
                </div>
            )}
            {(showDialog || (showDialog && rows.length === 0)) && (
                <div className="overlay"></div>
            )}
            {showDialog && rows.length > 0 && rows[rows.length - 1].every((item) => item.color === "green") && (
                <div className="overlay"></div>
            )}
        </div>
    );
}
