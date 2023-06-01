import React from 'react';
import Game from './Game';
import SideBar from './SideBar';

const PracticePage: React.FC = () => {
    return <div><SideBar /> <Game mode="practice" /></div>;
};

export default PracticePage;
