import React, { useRef, useState } from 'react';
import './Header.scss';
import { MdClear } from 'react-icons/md';
import { BiCart, BiSearch } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const [isFragmentVisible, setIsFragmentVisible] = useState(true);
  const contentUl = useRef()
  const handleClearClick = () => {
    setIsFragmentVisible(false);
  };

  const handleBurgerClick = () => {
    contentUl.current.classList.toggle("resp")
  }
  return (
    <header>
      {isFragmentVisible && (
        <div className='header-top'>
          <p>Sign up and get 20% off to your first order. <a href="#">Sign Up Now</a></p>
          <MdClear className='clear-btn' onClick={handleClearClick} />
        </div>
      )}
      <div className='container'>
        <div className='navbar-wrapper'>
          <h3>SHOP.CO</h3>
          <div className='content-ul'>
            <ul>Shop
              <li>On Sale</li>
              <li>New Arrivals</li>
              <li>Brands</li>
            </ul>
          </div>
          <div className='search-input'>
            <BiSearch />
            <input type="text" placeholder='Search for products...' />
          </div>
          <div className='card-and-profile-icons'>
            <BiCart />
            <CgProfile />
          </div>
        </div>
        <div className='navbar-wrapper resp'>
          <div className='navbar-wrapper-resp__left'>
            <GiHamburgerMenu size={30} onClick={handleBurgerClick} />
            <h3>SHOP.CO</h3>
          </div>
          <div className='card-and-profile-icons'>
            <BiSearch color='black' />
            <BiCart />
            <CgProfile />
          </div>
          <div className='navbar-wrapper resp__content-ul' ref={contentUl} >
            <ul>Shop
              <li>On Sale</li>
              <li>New Arrivals</li>
              <li>Brands</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;