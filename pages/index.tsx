import React from 'react';
import Game from './Game';
import SideBar from './SideBar';

const HomePage: React.FC = () => {
  return <div><SideBar /> <Game mode='' /></div>;
};

export default HomePage;