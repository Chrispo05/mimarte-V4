import headerSyles from "../scss/Header.scss";
import mimarteLogo from "../../Icons/mimarteLogo.jpg";
import { RiSearchFill,RiShoppingBagFill,RiShoppingBag3Line,RiHome6Line } from "react-icons/ri"
import { AiFillPhone,AiOutlineSearch,AiFillInstagram } from "react-icons/ai"
import { BiShoppingBag } from "react-icons/bi"
import pestañaIcon from "../../Icons/pestaña.png";
import { Link } from 'react-router-dom';


import { BsTelephone,BsFillTelephoneFill } from "react-icons/bs"
import { FiShoppingBag } from "react-icons/fi"
import { FaShoppingBag, FaFacebookSquare,FaWhatsappSquare,FaInstagramSquare } from "react-icons/fa"
import { CgShoppingBag } from "react-icons/cg"


import instaIcon from "../../Icons/instagram.png";
import facebookIcon from "../../Icons/facebook.png";
import whatsappIcon from "../../Icons/whatsapp.png";




import React, { useEffect } from "react";

export default function Header() {
  const headerText = "Envíos a toda Colombia!";
  const typingSpeed = 100; // Velocidad de escritura (en milisegundos)
  const erasingSpeed = 90; // Velocidad de borrado (en milisegundos)
  const pauseBetweenAnimations = 3000; // Pausa entre animaciones (en milisegundos)

  useEffect(() => {
    const headerTextElement = document.getElementById("header-text");

    async function typeText(text) {
      for (let i = 0; i < text.length; i++) {
        await sleep(typingSpeed);
        headerTextElement.textContent = text.substr(0, i + 1);
      }
    }

    async function eraseText(text) {
      for (let i = text.length; i >= 0; i--) {
        await sleep(erasingSpeed);
        headerTextElement.textContent = text.substr(0, i);
      }
    }

    async function animateHeaderText() {
      while (true) {
        await typeText(headerText);
        await sleep(pauseBetweenAnimations);
        await eraseText(headerText);
      }
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    animateHeaderText();

    return () => {
      // Limpiar intervalos o timeouts si es necesario
    };
  }, []);

  return (
    <header>
      <div className="header__banner-text-container flex-column-center">
        <p id="header-text" className="header__banner-text__text font-mobile-small-B font-color-40 font-500">
          <span className="header__banner-text__text__span">!</span>
        </p>
      </div>
      <div className="header__navbar-container   ">
                <div className="header__navbar__hamburguer-container ">
                    <label htmlFor="check">
                        <input type="checkbox" id="check"/>
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <div className="header__navbar__social-media-links-container ">
                    {/* <instaIcon className="header__navbar__social-media__icons font-color-40"/>
                    <facebookIcon className="header__navbar__social-media__icons font-color-40"/>
                    <whatsappIcon className="header__navbar__social-media__icons font-color-40"/> */}
                    <img className="header__navbar__social-media__icons font-color-40" src={instaIcon} alt="instaIcon"   />
                    <img className="header__navbar__social-media__icons font-color-40" src={facebookIcon} alt="instaIcon"   />
                    <img className="header__navbar__social-media__icons font-color-40" src={whatsappIcon} alt="instaIcon"   />
                </div>
                <div className="header__navbar__logo-container">
                    <img className="header__navbar__logo-img shadow-A " alt="mimarteLogo" src={mimarteLogo} />
                </div>
                <div className="header__navbar__icon-container font-mobile-small-C font-color-40 ">

                    <div className="flex-row-center"> <p className="header__navbar__icon-tag header__navbar__icon-tag-inicio " >Inicio</p><RiHome6Line className="header__navbar__icons font-color-40 header__navbar__icon-home"/>   </div>
                   <div className="flex-row-center"> <p className="header__navbar__icon-tag" >Buscador</p>  <AiOutlineSearch className="header__navbar__icons font-color-40"/>  </div>
                    <Link to="/products" className="flex-row-center header__navbar__pestana-container"> <p  className="header__navbar__icon-tag" >Productos</p> <CgShoppingBag className="header__navbar__icons font-color-40"/> {/*  <img className="header__navbar__pestana__icon"  alt="icon" src={pestañaIcon} /> */}   </Link>
                    <div className="flex-row-center"> <p className="header__navbar__icon-tag" >Contacto</p> <BsTelephone className="header__navbar__icons font-color-40"/>  </div>
                </div>

            </div>
      <div className="header__navbar__pestana__icon-container"></div>
    </header>
  );
}
