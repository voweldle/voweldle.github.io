import React, { useEffect, useRef, useState, useCallback } from "react";
import Keyboard from "react-simple-keyboard";
// import { checkWord } from "./dictionary"; // An example function to check if a word is valid in English

import "react-simple-keyboard/build/css/index.css";

const INITIAL_WORD = "motorist".toUpperCase();
const numLetters = INITIAL_WORD.length; // Set the number of letters based on the initial word length
const VOWEL_STYLE = "vowel";

// function to return true if character is a vowel
const isVowel = (char: string) => {
    return "AEIOU".includes(char);
};

// write a function that takes a array of characters as input,
// pushes in as many consecutive vowels from INITIAL_LETTERS as possible
// matching up the position correctly and returns the new array
const fillVowels = (typedLetters: string[]) => {
    const newTypedLetters = [...typedLetters];
    for (let i = newTypedLetters.length; i < numLetters; i++) {
        if (isVowel(INITIAL_WORD[i])) {
            newTypedLetters.push(INITIAL_WORD[i]);
        } else {
            break;
        }
    }
    return newTypedLetters;
};

export default function SimpleKeyboard() {
    const keyboard = useRef<any | null>(null);

    const [status, setStatus] = useState("IN_PROGRESS");
    const [showTooFewLettersDialog, setShowTooFewLettersDialog] = useState(false);
    const [showWinDialog, setShowWinDialog] = useState(false);

    const [typedLetters, setTypedLetters] = useState<string[]>(fillVowels([]));
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

    function AutoDisappearingDialogBox({ message, timeout = 3000 }: { message: string, timeout?: number }) {
        useEffect(() => {
            const timer = setTimeout(() => {
                setShowTooFewLettersDialog(false);
            }, timeout);

            return () => clearTimeout(timer);
        }, [timeout]);

        return showTooFewLettersDialog ? (
            <div className="dialog-box">
                <div className="message">{message}</div>
            </div>
        ) : null;
    }

    const handleCloseWinDialog = () => {
        setShowWinDialog(false); // hide win dialog box
    };


    const handleKeyPress = async (key: string) => {
        if (status === "WIN") {
            return;
        }
        if (key === "Backspace") {
            // TODO: fix logic to handle backspace properly with vowels
            // only remove the consonant not vowel!
            setTypedLetters(typedLetters.slice(0, -1));
        } else if (key === "Enter") {
            if (typedLetters.length === numLetters) {
                const typedWord = typedLetters.join("");
                const isWordValid = checkWord(typedWord); // check if the entered word is valid
                let newRow: { letter: string; color: string }[] = [];

                if (typedWord === INITIAL_WORD) {
                    newRow = typedLetters.map(
                        letter => {
                            return { letter, color: "green" };
                        }
                    );
                } else {
                    newRow = typedLetters.map(
                        (letter, index) => {
                            if ("AEIOU".includes(INITIAL_WORD[index])) {
                                return { letter: INITIAL_WORD[index], color: VOWEL_STYLE };
                            } else if (INITIAL_WORD[index] === letter) {
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
                }
                setAttempts(attempts + 1);
                if (await isWordValid) {
                    setRows([...rows, newRow]);
                    setTypedLetters(fillVowels([]));
                    if (newRow.every((item) => item.color === "green")) {
                        setStatus("WIN");
                        setShowWinDialog(true);
                    }
                } else {
                    setRows([...rows, newRow.map((item) => ({ ...item, color: "black" }))]);
                    setTypedLetters(fillVowels([]));
                }
            } else {
                setShowTooFewLettersDialog(true);
            }
        } else {
            if (typedLetters.length < numLetters) {
                setTypedLetters(typedLetters => fillVowels([...typedLetters, key]));
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
                    {status === "IN_PROGRESS" ? (
                        <>
                            {INITIAL_WORD.split("").map((letter, index) => {
                                const isVowelInInitialWord = isVowel(letter);
                                const isAlreadyTyped = index < typedLetters.length;
                                const className = isVowelInInitialWord ? VOWEL_STYLE : "";
                                const content = isAlreadyTyped ? typedLetters[index] : (isVowelInInitialWord ? letter : "\u00A0");
                                console.log("content", content);
                                console.log("isVowelInInitialWord", isVowelInInitialWord);
                                return (
                                    <div key={index} className={`box ${className}`}>
                                        {content}
                                    </div>
                                );
                            })}
                        </>
                    ) : null}
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
            <AutoDisappearingDialogBox message="Too few letters!" timeout={1000} />

            {showWinDialog && ( // render win dialog box if showWinDialog is true
                <div className="win-dialog-box">
                    <div className="message">
                        <button className="close-button" onClick={handleCloseWinDialog}>✕</button> {/* add close button */}
                        <p>You win! Attempts: {attempts}</p>
                    </div>
                </div>
            )}

        </div>
    );
}
