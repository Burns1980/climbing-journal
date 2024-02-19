import { useState } from 'react';
import Header from './components/header/Header';
import NavigationBar from './components/nav-bar/NavigationBar';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import noseImage from './assets/images/nose-thumbnail.jpg'
import './App.css';

function App() {
  return (
    <>
      <Header />
      <NavigationBar />
      <img src={noseImage} alt='Me hanging out at El Cap tower'/>
      {/* <img src='https://mountainproject.com/assets/photos/climb/105865419_sqsmall_1557935138.jpg?cache=1701314757' /> */}
      <div>ello dumpling</div>
      <p>Who says hello dumpling?</p>
    </>
  );
}

export default App;
