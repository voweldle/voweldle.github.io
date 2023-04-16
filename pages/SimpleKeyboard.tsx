import React, { useEffect, useRef, useState, useCallback } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import initialData from './initial-local-storage.json';

interface GameData {
    game: {
        id: number;
        dayOffset: number;
        boardState: string[];
        currentRowIndex: number;
        status: string;
        answer: string;
        lastPlayed: string;
        lastCompleted: string;
        lastGenerated: string;

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


const VOWEL_STYLE = "vowel";

// function to return true if character is a vowel
const isVowel = (char: string) => {
    return "AEIOU".includes(char);
};

const LETTERS = "QWERTYUIOPASDFGHJKLZXCVBNM";

export default function SimpleKeyboard() {
    const keyboard = useRef<any | null>(null);

    const [showTooFewLettersDialog, setShowTooFewLettersDialog] = useState(false);
    const [showWinDialog, setShowWinDialog] = useState(false);

    const [typedLetters, setTypedLetters] = useState<string[]>([]);
    const [rows, setRows] = useState<Array<{ letter: string; color: string }[]>>(
        []
    );
    const [attempts, setAttempts] = useState(0);

    const [gameData, setGameData] = useState<GameData>(initialData);
    const [isGameDataLoaded, setIsGameDataLoaded] = useState(false);
    const [initialWord, setInitialWord] = useState("");
    const [numLetters, setNumLetters] = useState(0);
    const [buttonTheme, setButtonTheme] = useState<{ class: string; buttons: string; }[]>([]);
    const boxContainerRef = useRef<HTMLDivElement>(null);

    // create key colors state, mapping letters to colors, initially setting
    // all letters to none, and vowels to "vowel"
    const [keyColors, setKeyColors] = useState(
        LETTERS.split("").reduce((acc, letter) => {
            acc[letter] = isVowel(letter) ? VOWEL_STYLE : "none";
            return acc;
        }, {} as Record<string, string>)
    );

    // use ref to store if typed letters update is in progress
    const isTypedLettersUpdateInProgress = useRef(false);

    // write a function that takes a array of characters as input,
    // pushes in as many consecutive vowels from INITIAL_LETTERS as possible
    // matching up the position correctly and returns the new array
    const fillVowels = (typedLetters: string[], answer: string) => {
        const newTypedLetters = [...typedLetters];
        for (let i = newTypedLetters.length; i < answer.length; i++) {
            if (isVowel(answer[i])) {
                newTypedLetters.push(answer[i]);
            } else {
                break;
            }
        }
        return newTypedLetters;
    };

    useEffect(() => {

        const generateInitialWord = async () => {
            const response = await fetch('/game_word_list.txt');
            const text = await response.text();
            const words = text.split('\n');
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomWord = words[randomIndex].toUpperCase();

            setInitialWord(randomWord);
            setNumLetters(randomWord.length);
            isTypedLettersUpdateInProgress.current = true;
            setTypedLetters(() => {
                isTypedLettersUpdateInProgress.current = false;
                return fillVowels([], randomWord);
            });
            setGameData(gameData => {
                gameData.game.boardState = [];
                gameData.game.answer = randomWord;
                gameData.game.lastGenerated = new Date().toISOString();
                gameData.game.status = 'IN_PROGRESS';
                return gameData;
            });

            setIsGameDataLoaded(true); // move this line here

        };

        // Load data from local storage when the component mounts
        var localgameData = localStorage.getItem('gameData');
        if (localgameData) {

            const gameEnvironment = process.env.NODE_ENV || 'development';
            const resetThreshold = gameEnvironment === 'development' ? 120000 : 0;
            let lastGeneratedTime = Date.parse(JSON.parse(localgameData).game.lastGenerated);

            const currentTime = new Date().getTime();

            if (gameEnvironment === 'production' && lastGeneratedTime < new Date().setHours(0, 0, 0, 0)) {
                generateInitialWord();
            } else if (gameEnvironment !== 'production' && lastGeneratedTime < currentTime - resetThreshold) {
                generateInitialWord();
            } else {
                let localGameDataParsed = JSON.parse(localgameData);
                setGameData(localGameDataParsed);
                let answer = localGameDataParsed.game.answer;
                //get intial word from local storage
                setInitialWord(answer);
                const browserRows = localGameDataParsed.game.boardState;
                // set rows to array of empty arrays of length browserRows.length
                setRows(Array(browserRows.length).fill([]));
                setAttempts(browserRows.length);
                // call updaterows for the all rows
                browserRows.map((browserRow: string, index: number) => {
                    return UpdateRows(browserRow, index, answer);
                });
                //set number of letters to length of answer
                setNumLetters(answer.length);
                setTypedLetters(() => {
                    isTypedLettersUpdateInProgress.current = false;
                    return fillVowels([], answer);
                });
                setIsGameDataLoaded(true);
            }
        } else {
            generateInitialWord();
        }
    }, []);


    const checkWord = async (word: string) => {
        const response = await fetch('/enable_word_list.txt');
        const text = await response.text();
        const words = text.split('\n');
        console.log(words);
        const lowerCaseWords = words.map(wordi => wordi.toLowerCase());
        return lowerCaseWords.includes(word.toLowerCase());
    }

    const onKeyPress = (button: string) => {
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

    // make buttonTheme using keyColors
    // to set the class of each button. 
    // If the key has keyColors C, then the class name should be "key-C"
    // Filter out any cases when the buttons is empty
    // Filter out any cases when the buttons is empty
    useEffect(() => {
        setButtonTheme(["green", "red", "yellow", "none", "vowel"].map(color => {
            return {
                class: `key-${color}`,
                buttons: Object.keys(keyColors).filter(key => keyColors[key] === color).join(" ")
            };
        }).filter((item) => item.buttons !== ""));
    }, [keyColors]);

    function updateKeyColors(currentKeyColor: Record<string, string>, newRow: { letter: string; color: string; }[]) {

        const newKeyColors = { ...currentKeyColor };
        newRow.forEach((item) => {
            // 1. if the letter is a vowel do nothing
            // 2. if the letter color was previously green, do nothing
            // 3. if the letter color was previously red, do nothing
            // 4. if the letter color was previously yellow but is now green,
            //    change it to green
            // 5. if the letter color was previously none, set to current color
            if (!isVowel(item.letter)) {
                if (newKeyColors[item.letter] === "yellow" && item.color === "green") {
                    newKeyColors[item.letter] = "green";
                } else if (newKeyColors[item.letter] === "none") {
                    newKeyColors[item.letter] = item.color;
                }
            }
        });
        return newKeyColors;
    }

    function updateKeyColorsOnWin(currentKeyColor: Record<string, string>, answer: string) {
        // mark all letters in answer as green, even vowels
        const newKeyColors = { ...currentKeyColor };
        answer.split("").forEach((letter) => {
            newKeyColors[letter] = "green";
        });
        return newKeyColors;
    }

    //Function to update rows based on the locals storage data
    async function UpdateRows(word: string, rowIndex: number, answer: string) {
        //convert browserRow to array of letters
        const typedLetters = word.split("");
        const newRow: { letter: string; color: string }[] = generateRowWithColor(typedLetters, word, answer);

        const isWordValid = checkWord(word); // check if the entered word is valid
        if (await isWordValid) {
            setRows(rows => {
                rows[rowIndex] = newRow;
                return [...rows];
            });
            // set key colors according to the new row
            setKeyColors((currentKeyColors) => updateKeyColors(currentKeyColors, newRow));
            if (newRow.every((item) => item.color === "green")) {
                setShowWinDialog(true);
                setKeyColors((currentKeyColors) => updateKeyColorsOnWin(currentKeyColors, answer));
            }
        } else {
            setRows(rows => {
                rows[rowIndex] = newRow.map((item) => ({ ...item, color: "black" }));
                return [...rows];
            }
            );

        }
    };

    function generateRowWithColor(typedLetters: string[], word: string, answer: string): { letter: string; color: string; }[] {
        if (word === answer) {
            return typedLetters.map(
                letter => {
                    return { letter, color: "green" };
                }
            );
        }

        return typedLetters.map(
            (letter, index) => {
                if ("AEIOU".includes(answer[index])) {
                    return { letter: answer[index], color: VOWEL_STYLE };
                } else if (answer[index] === letter) {
                    return { letter, color: "green" };
                } else if (answer.includes(letter)) {
                    // count the number of times letter appears in 
                    // INITIAL_WORD
                    const numOccurrences = answer.split("")
                        .filter((item) => item === letter).length;
                    // count the number of times letter appears in
                    // typedWord so far to left index
                    const numTypedOccurrences = typedLetters
                        .slice(0, index)
                        .filter((item) => item === letter).length;
                    // find number of places where letter appears in
                    // INITIAL_WORD and typedWord in the same location
                    const numGreenOccurrences = answer.split("")
                        .filter((item, index) => item === letter && item === word[index]).length;
                    // number of green occurences to left of current index
                    const numGreenOccurrencesToLeft = answer.split("")
                        .slice(0, index)
                        .filter((item, index) => item === letter && item === word[index]).length;

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
        if (isGameDataLoaded) {
            localStorage.setItem('gameData', JSON.stringify(gameData));
        }
    }, [gameData, isGameDataLoaded]);


    // automatically scroll box container to the bottom
    useEffect(() => {
        const scrollToBottom = () => {
            if (boxContainerRef.current) {
                boxContainerRef.current.scrollTop = boxContainerRef.current.scrollHeight;
            }
        };

        scrollToBottom();
    }, [rows]); // Add appropriate dependencies if needed    

    const handleKeyPress = async (key: string) => {
        if (gameData.game.status === "WIN") {
            return;
        }
        if (isTypedLettersUpdateInProgress.current) {
            return;
        }
        if (key === "Backspace") {
            isTypedLettersUpdateInProgress.current = true;
            setTypedLetters(typedLetters => {
                // truncate typedLetters to the last consonant position
                // in initial word before the typedLetters.length

                // basically only want to backspace last consonant

                let initial_word_upto_typedLetters_length = initialWord.slice(0, typedLetters.length).split("");
                const lastConsonantIndex = typedLetters.length - 1 - initial_word_upto_typedLetters_length.reverse().findIndex((letter) => !isVowel(letter));
                const newTypedLetters = typedLetters.slice(0, lastConsonantIndex);
                isTypedLettersUpdateInProgress.current = false;
                return fillVowels(newTypedLetters, initialWord);
            });

        } else if (key === "Enter") {
            if (typedLetters.length === numLetters) {
                isTypedLettersUpdateInProgress.current = true;
                const typedWord = typedLetters.join("");
                const isWordValid = checkWord(typedWord); // check if the entered word is valid

                setGameData(gameData => {
                    return {
                        ...gameData,
                        game: {
                            ...gameData.game,
                            boardState: [...gameData.game.boardState, typedWord]
                        }
                    }
                }) // save the word to local storage

                const newRow: { letter: string; color: string }[] = generateRowWithColor(typedLetters, typedWord, initialWord);
                // TODO: can we refactor below part also to reuse code?
                setAttempts(attempts => attempts + 1);
                if (await isWordValid) {
                    setRows(rows => [...rows, newRow]);
                    setTypedLetters(() => {
                        isTypedLettersUpdateInProgress.current = false;
                        return fillVowels([], initialWord)
                    });
                    // set key colors according to the new row
                    setKeyColors((currentKeyColors) => updateKeyColors(currentKeyColors, newRow));

                    if (newRow.every((item) => item.color === "green")) {
                        setGameData(gameData => {
                            return {
                                ...gameData,
                                game: {
                                    ...gameData.game,
                                    lastCompleted: new Date().toISOString(),
                                    lastPlayed: new Date().toISOString(),
                                    status: "WIN"
                                }
                            }
                        }); // save the word to local storage
                        setKeyColors((currentKeyColors) => updateKeyColorsOnWin(currentKeyColors, initialWord));
                        setShowWinDialog(true);
                    }
                } else {
                    setRows(rows => [...rows, newRow.map((item) => ({ ...item, color: "black" }))]);
                    setTypedLetters(() => {
                        isTypedLettersUpdateInProgress.current = false;
                        return fillVowels([], initialWord)
                    });
                    setGameData(gameData => {
                        return {
                            ...gameData, game:
                            {
                                ...gameData.game,
                                lastPlayed: new Date().toISOString(),
                                status: "IN_PROGRESS"
                            }
                        }
                    }) // save the word to local storage

                }
                setGameData(gameData => {
                    return {
                        ...gameData,
                        game: {
                            ...gameData.game,
                            currentRowIndex: rows.length
                        }
                    }
                }) // save the word to local storage
            } else {
                setShowTooFewLettersDialog(true);
            }
        } else {
            if (typedLetters.length < numLetters) {
                isTypedLettersUpdateInProgress.current = true;
                setTypedLetters(typedLetters => {
                    isTypedLettersUpdateInProgress.current = false;
                    return fillVowels([...typedLetters, key], initialWord)
                });
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
        <>
            <div className="keyboard-container">
                <div className="box-container" ref={boxContainerRef}>
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
                        {gameData.game.status === "IN_PROGRESS" ? (
                            <>
                                {initialWord.split("").map((letter, index) => {
                                    const isVowelInInitialWord = isVowel(letter);
                                    const isAlreadyTyped = index < typedLetters.length;
                                    const className = isVowelInInitialWord ? VOWEL_STYLE : "";
                                    const content = isAlreadyTyped ? typedLetters[index] : (isVowelInInitialWord ? letter : "\u00A0");
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
                        buttonTheme={buttonTheme}
                    />
                </div>


            </div>
            <div className="dialog-box-wrapper">
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
        </>
    );
}
