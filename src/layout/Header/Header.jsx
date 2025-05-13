import React, { useEffect, useRef, useState } from 'react';
import './Header.scss';
import { MdClear } from 'react-icons/md';
import { BiCart, BiSearch } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCircleNotifications } from "react-icons/md";

function Header() {
  const [isFragmentVisible, setIsFragmentVisible] = useState(true);
  const [isOnNot, setIsOnNot] = useState(false);

  const notificationWrapperRef = useRef(null);
  const notificationRespWrapperRef = useRef(null);
  const contentUlRef = useRef(null);

  const handleClearClick = () => {
    setIsFragmentVisible(false);
  };

  const handleClickBasket = () => {
    window.location.href = '/basket';
  };

  const handleBurgerClick = () => {
    if (contentUlRef.current) {
      contentUlRef.current.classList.toggle("resp");
    }
  };

  useEffect(() => {
    let data = localStorage.getItem("products") || "[]";
    data = JSON.parse(data);

    if (data.length > 0) {
      setIsOnNot(true);
    } else {
      setIsOnNot(false);
    }

    if (notificationWrapperRef.current) {
      if (isOnNot) {
        notificationWrapperRef.current.classList.add("onn");
      } else {
        notificationWrapperRef.current.classList.remove("onn");
      }
    }

    if (notificationRespWrapperRef.current) {
      if (isOnNot) {
        notificationRespWrapperRef.current.classList.add("onn");
      } else {
        notificationRespWrapperRef.current.classList.remove("onn");
      }
    }
  }, [isOnNot]);

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
            <MdCircleNotifications ref={notificationWrapperRef} className='basket-notification' size={20} />
            <BiCart onClick={handleClickBasket} style={{ cursor: "pointer" }} />
            <CgProfile />
          </div>
        </div>
        <div className='navbar-wrapper resp'>
          <div className='navbar-wrapper-resp__left'>
            <GiHamburgerMenu size={30} onClick={handleBurgerClick} />
            <h3>SHOP.CO</h3>
          </div>
          <div className='card-and-profile-icons'>
            <MdCircleNotifications ref={notificationRespWrapperRef} className='basket-notification' />
            <BiSearch color='black' />
            <BiCart onClick={handleClickBasket} style={{ cursor: "pointer" }} />
            <CgProfile />
          </div>
          <div className='navbar-wrapper resp__content-ul' ref={contentUlRef}>
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
