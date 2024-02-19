import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header/Header';
import NavigationBar from '../components/nav-bar/NavigationBar';
import noseImage from '../assets/images/nose-thumbnail.jpg'

function Root() {
  return (
    <>
      <Header />
      <NavigationBar />
      <img src={noseImage} alt='Me hanging out at El Cap tower'/>
      {/* <img src='https://mountainproject.com/assets/photos/climb/105865419_sqsmall_1557935138.jpg?cache=1701314757' /> */}
      <div>ello dumpling</div>
      <p>Who says hello dumpling?</p>
      <Outlet />
    </>
  );
}

export default Root;
