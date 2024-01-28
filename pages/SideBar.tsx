import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Modal } from 'antd';

interface SideBarState {
    isOpen: boolean;
}

export default function SideBar() {
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    const [isVisibleHelpDialog, setVisibleHelpDialog] = useState(false);

    const [isVisibleAboutDialog, setVisibleAboutDialog] = useState(false);

    const handleSideBarStateChange = (state: SideBarState) => {
        setSideBarOpen(state.isOpen);
    };

    const closeSideBar = () => {
        setSideBarOpen(false)
    }

    const showAboutDialog = () => {
        setVisibleAboutDialog(true);
    };

    const closeAboutDialog = () => {
        setVisibleAboutDialog(false);
    };

    const showHelpDialog = () => {
        setVisibleHelpDialog(true);
    };

    const closeHelpDialog = () => {
        setVisibleHelpDialog(false);
    };

    return (
        <div>
            <div className="top-container">
                <div className="side-container">
                    <Menu width={'200px'} isOpen={isSideBarOpen} onStateChange={handleSideBarStateChange}>
                        <a id="about" className="menu-item" onClick={() => { showAboutDialog(); closeSideBar() }}>ABOUT</a>
                        <a id="instructions" className="menu-item" onClick={() => { showHelpDialog(); closeSideBar() }} >INSTRUCTIONS</a>
                    </Menu>
                </div>
                <div className="top-bar">

                    <h1>
                        <span>V</span>
                        <span>O</span>
                        <span>W</span>
                        <span>E</span>
                        <span>L</span>
                        <span>D</span>
                        <span>L</span>
                        <span>E</span>
                    </h1>
                </div>
            </div>

            <div className="dialog-box-wrapper">
                {isVisibleHelpDialog && (

                    <div className="modal-container">
                        <Modal

                            footer={null}
                            open={isVisibleHelpDialog}
                            onOk={closeHelpDialog}
                            onCancel={closeHelpDialog}
                        >
                            <h2>How to Play?</h2>

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <p>In Voweldle, you are given the vowels in a word and you need to guess the consonants. In the example below, the aim is to guess a word with one vowel <span style={{ fontWeight: "bold" }}>A</span> at the second position.</p>
                                <div className="instruction_word_input">

                                    <span> </span>
                                    <span>A</span>
                                    <span> </span>
                                    <span> </span>
                                    <span> </span>

                                </div>
                                <p>Suppose you guess <span style={{ fontWeight: "bold" }}>PARTY</span> as the word and get the following result.</p>
                                <div className="instruction_word_guess">

                                    <span>P</span>
                                    <span>A</span>
                                    <span>R</span>
                                    <span>T</span>
                                    <span>Y</span>

                                </div>

                                <div className="instruction_word_guess_desc">
                                    <div className="instruction_word_guess_desc_row">
                                        <div className="instruction_word_guess_desc_box" style={{ backgroundColor: "var(--color-yellow)", color: "white" }}>P</div>
                                        <p>Yellow means the letter is present in the answer, but not at this position.</p>
                                    </div>
                                    <div className="instruction_word_guess_desc_row">
                                        <div className="instruction_word_guess_desc_box" style={{ backgroundColor: "var(--color-vowel)", color: "white" }}>A</div>
                                        <p>Grey represents vowels in the answer which are prefilled.</p>
                                    </div>
                                    <div className="instruction_word_guess_desc_row">
                                        <div className="instruction_word_guess_desc_box" style={{ backgroundColor: "var(--color-red)", color: "white" }}>R</div>
                                        <p>Red means the letter is not present in the answer.</p>
                                    </div>
                                    <div className="instruction_word_guess_desc_row">
                                        <div className="instruction_word_guess_desc_box" style={{ backgroundColor: "var(--color-red)", color: "white" }}>T</div>
                                        <p>Red means the letter is not present in the answer.</p>
                                    </div>
                                    <div className="instruction_word_guess_desc_row">
                                        <div className="instruction_word_guess_desc_box" style={{ backgroundColor: "var(--color-green)", color: "white" }}>Y</div>
                                        <p>Green means the letter is present in the answer at this position.</p>
                                    </div>
                                </div>


                                <p>In this example, the answer is <span style={{ fontWeight: "bold" }}>HAPPY</span>.</p>
                                <div className="instruction_word_answer">

                                    <span>H</span>
                                    <span>A</span>
                                    <span>P</span>
                                    <span>P</span>
                                    <span>Y</span>

                                </div>

                            </div>
                        </Modal>
                    </div>
                )
                }

                {isVisibleAboutDialog && (

                    <div className="modal-container">
                        <Modal
                            className="about-dialog-modal"
                            footer={null}
                            open={isVisibleAboutDialog}
                            onOk={closeAboutDialog}
                            onCancel={closeAboutDialog}
                        >
                            <h2 className="about-dialog-title">About</h2>
                            <p className="about-dialog-text">
                                Voweldle is a word-guessing game where you are given the vowels
                                and need to guess the consonants of a word in as few moves as possible.
                                This game is inspired by the games <a className="about-dialog-link" href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer">Wordle</a> and its Hindi counterpart <a className="about-dialog-link" href="https://kach.github.io/shabdle/" target="_blank" rel="noopener noreferrer">Shabdle</a>.
                            </p>
                            <br />
                            <p className="about-dialog-text">This game is developed by Shivani Charkha and Shubham Chandak, with the aid of GitHub Copilot and ChatGPT.
                                You can find the <a className="about-dialog-link" href="https://github.com/voweldle/voweldle.github.io" target="_blank" rel="noopener noreferrer">source code on GitHub</a> and leave
                                any comments/issues there.
                            </p>
                            <br />
                            <p>Enjoy 😊</p>
                        </Modal>
                    </div>
                )}
            </div>
        </div>
    );
}




