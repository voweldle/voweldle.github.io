import React, { useEffect, useRef, useState, useCallback } from "react";
import Keyboard from "react-simple-keyboard";
// import { checkWord } from "./dictionary"; // An example function to check if a word is valid in English

import "react-simple-keyboard/build/css/index.css";
import initialData from './initial-local-storage.json';

const INITIAL_WORD = "Color".toUpperCase();

interface GameData {
    game: {
        id: number;
        dayOffset: number;
        boardState: string[];
        currentRowIndex: number;
        status: string;
        timestamps: {
            lastPlayed: number;
            lastCompleted: number;
        };
    };
    settings: {
        hardMode: boolean;
        darkMode: boolean;
        colorblindMode: boolean;
    };
    stats: {
        currentStreak: number;
        maxStreak: number;
        guesses: Record<string, any>;
        winPercentage: number;
        gamesPlayed: number;
        gamesWon: number;
        averageGuesses: number;
        isOnStreak: boolean;
        hasPlayed: boolean;
    };
    timestamp: number;
    schemaVersion: string;
}

export default function SimpleKeyboard() {
    const keyboard = useRef<any | null>(null);
    const numLetters = INITIAL_WORD.length; // Set the number of letters based on the initial word length

    const [status, setStatus] = useState("IN_PROGRESS");
    const [showTooFewLettersDialog, setShowTooFewLettersDialog] = useState(false);
    const [showWinDialog, setShowWinDialog] = useState(false);

    const [typedLetters, setTypedLetters] = useState<string[]>([]);
    const [rows, setRows] = useState<Array<{ letter: string; color: string }[]>>(
        []
    );
    const [attempts, setAttempts] = useState(0);

    const [gameData, setGameData] = useState<GameData>(initialData);

    useEffect(() => {
        console.log("calling useEffect on mount");

        // Load data from local storage when the component mounts
        var localgameData = localStorage.getItem('gameData');
        if (localgameData) {
            setGameData(JSON.parse(localgameData));
            const browserRows = JSON.parse(localgameData).game.boardState;
            // set rows to array of empty arrays of length browserRows.length
            setRows(Array(browserRows.length).fill([]));

            setAttempts(browserRows.length);
            // set typedletters to empty array
            setTypedLetters([]);

            // call updaterows for the all rows
            browserRows.map((browserRow: string, index: number) => {
                return UpdateRows(browserRow, index);
            });
        } else {
            localStorage.setItem('gameData', JSON.stringify(gameData));
        }

    }, []);

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

    //Function to update rows based on the locals storage data
    async function UpdateRows(word: string, rowIndex: number) {
        //convert browserRow to array of letters
        console.log("updating browserRow", word);
        const typedLetters = word.split("");
        const newRow: { letter: string; color: string }[] = generateRowWithColor(typedLetters, word);

        const isWordValid = checkWord(word); // check if the entered word is valid

        console.log("isWordValid", isWordValid);
        if (await isWordValid) {
            setRows(rows => {
                rows[rowIndex] = newRow;
                return [...rows];
            });
            if (newRow.every((item) => item.color === "green")) {
                setStatus("WIN");
                setShowWinDialog(true);
            }
        } else {
            setRows(rows => {
                rows[rowIndex] = newRow.map((item) => ({ ...item, color: "black" }));
                return [...rows];
            }
            );

        }
    };

    function generateRowWithColor(typedLetters: string[], word: string): { letter: string; color: string; }[] {
        return typedLetters.map(
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
                    const numGreenOccurrences = INITIAL_WORD.split("").filter((item, index) => item === letter && item === word[index]).length;
                    // number of green occurences to left of current index
                    const numGreenOccurrencesToLeft = INITIAL_WORD.split("").slice(0, index).filter((item, index) => item === letter && item === word[index]).length;

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

    // add an effect to put gameData in local storage when gameData changes
    useEffect(() => {
        localStorage.setItem('gameData', JSON.stringify(gameData));
    }, [gameData]);

    const handleKeyPress = async (key: string) => {
        if (status === "WIN") {
            return;
        }
        if (key === "Backspace") {
            setTypedLetters(typedLetters => typedLetters.slice(0, -1));
        } else if (key === "Enter") {
            if (typedLetters.length === numLetters) {
                const typedWord = typedLetters.join("");
                const isWordValid = checkWord(typedWord); // check if the entered word is valid
                setGameData(gameData => { return { ...gameData, game: { ...gameData.game, boardState: [...gameData.game.boardState, typedWord] } } }); // save the word to local storage
                const newRow: { letter: string; color: string }[] = generateRowWithColor(typedLetters, typedWord);
                // TODO: can we refactor below part also to reuse code?
                setAttempts(attempts => attempts + 1);
                if (await isWordValid) {
                    setRows(rows => [...rows, newRow]);
                    setTypedLetters([]);
                    if (newRow.every((item) => item.color === "green")) {
                        setStatus("WIN");
                        setShowWinDialog(true);
                    }
                } else {
                    setRows(rows => [...rows, newRow.map((item) => ({ ...item, color: "black" }))]);
                    setTypedLetters([]);
                }

            } else {
                setShowTooFewLettersDialog(true);
            }
        } else {
            if (typedLetters.length < numLetters) {
                setTypedLetters(typedLetters => [...typedLetters, key]);
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
                    {status === "IN_PROGRESS" ? (
                        <>
                            {Array(numLetters - typedLetters.length).fill(null).map((_, index) => (
                                <div key={index + typedLetters.length} className="box">{" "}</div>
                            ))}
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
