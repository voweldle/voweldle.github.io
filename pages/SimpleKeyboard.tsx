import React, { useEffect, useRef, useState, useCallback } from "react";
import Keyboard from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";

export default function SimpleKeyboard() {
    const keyboard = useRef<any | null>(null);
    const numLetters = 10; // Adjust this value as needed

    const [showDialog, setShowDialog] = useState(false);
    const [typedLetters, setTypedLetters] = useState<string[]>([]);
    const [rows, setRows] = useState<string[]>([]);

    const prevTypedLetters = useRef<string[]>([]);

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
        ],
    };

    const customDisplay = {
        "{enter}": "ENTER",
        "{backspaceSymbol}": "⌫"
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    const handleKeyPress = (key: string) => {
        console.log(key);
        console.log(typedLetters);
        console.log(rows);
        if (key === "Backspace") {
            setTypedLetters(typedLetters.slice(0, -1));
        } else if (key === "Enter") {
            if (typedLetters.length >= numLetters) {
                setRows([...rows, typedLetters.join("")]);
                setTypedLetters([]);
            } else {
                setShowDialog(true);
            }
        } else {
            if (typedLetters.length < numLetters) {
                setTypedLetters([...typedLetters, key]);
            }
        }
    };

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
                        {row.split("").map((letter: string, index) => (
                            <div key={index} className="box">
                                {letter === " " ? "\u00A0" : letter}
                            </div>
                        ))}
                    </div>
                ))}
                <div className="row">
                    {typedLetters.map((letter: string, index) => (
                        <div key={index} className="box">{letter}</div>
                    ))}
                    {Array(numLetters - typedLetters.length)
                        .fill(null)
                        .map((_, index) => (
                            <div key={index + typedLetters.length} className="box">{" "}</div>
                        ))}
                </div>
            </div>

            <div className="virtual-keyboard">
                <Keyboard
                    keyboardRef={r => (keyboard.current = r)}
                    layout={customLayout}
                    display={customDisplay}
                    onKeyPress={onKeyPress}
                />
            </div>
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <p>Too few letters</p>
                        <button onClick={closeDialog}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
