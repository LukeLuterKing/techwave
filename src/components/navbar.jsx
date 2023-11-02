import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Microphone,MagnifyingGlass } from "phosphor-react";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import "./navbar.css";
import flagaImage2 from '../assets/products/flaga.png';
import flagaImage from '../assets/products/flaga2.png';
import { useTranslation } from "react-i18next";
import useAuthContext from "../context/AuthContext";
import glassSvg from "./glass.svg"; // Import the SVG image

export const Navbar = ({ toggleTheme, theme, onFlagChange }) => {
  const { user, logout } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(flagaImage);
  const { t, i18n } = useTranslation("global");

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFlagClick = () => {
    if (currentImage === flagaImage) {
      setCurrentImage(flagaImage2);
      i18n.changeLanguage("pl"); // Change language to Polish
      onFlagChange(flagaImage2);
    } else {
      setCurrentImage(flagaImage);
      i18n.changeLanguage("en"); // Change language to English
      onFlagChange(flagaImage);
    }
  };

  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mx-auto">
        <div className="links flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-blue-500">
            {t("navbar.link")}
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="search-container">
            <input
              type="text"
              placeholder={t("navbar.placeholder")}
              className="p-2 border rounded-lg"
            />
            <MagnifyingGlass size={32} />
            <div className="product-image">
              
              <Microphone size={32} />
            </div>
          </div>
          <img
            id="flag"
            src={currentImage}
            alt="Flaga Polski"
            onClick={handleFlagClick}
          />
          <div className="user-icon">
            {user ? (
              <Link to="/cart" className="text-white hover:text-blue-500">
                
              </Link>
            ) : (
              <ul className="user-menu">
                <li>
                  <Link to="/login">{t("navbar.link2")}</Link>
                </li>
              </ul>
            )}
          </div>
          <ThemeSwitchButton toggleTheme={toggleTheme} theme={theme} />
          <Link to="/cart" className="text-white hover:text-blue-500">
            <ShoppingCart size={32} />
          </Link>
        </div>
      </div>
    </div>
  );
};
