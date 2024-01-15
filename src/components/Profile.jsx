import React, { useState, useRef, useEffect } from "react";
import useAuthContext from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useTranslation } from "react-i18next";
import Order from "../pages/Order"; 
import Return from "../pages/Return";
import ShowComment from "../pages/ShowComment";
import AccountSettings from "../pages/AccountSettings";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { BsList, BsBoxArrowInRight, BsArrowReturnRight, BsPencil, BsGear, BsBoxArrowLeft } from 'react-icons/bs'; // Import różnych ikon
import { AiOutlineShopping } from 'react-icons/ai'; // Import ikony paczki
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuthContext();
  const { t } = useTranslation("global");
  const [currentView, setCurrentView] = useState("Order"); // Default view

  const isTabletMid = useMediaQuery({ query: "(max-width: 767px)" });
  const [open, setOpen] = useState(!isTabletMid);
  const sidebarRef = useRef();

  const handleLogout = () => {
    logout();
    Cookies.remove('loginCookie');
  }

  const changeView = (view) => {
    setCurrentView(view);
  }

  useEffect(() => {
    setOpen(!isTabletMid);
  }, [isTabletMid]);

  const Nav_animation = {
    open: { x: 0 },
    closed: { x: -250 },
  };

  const contentClass = open ? "w-3/4 ml-1/4" : "w-full";

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="min-h-screen flex relative" style={{ top: '70px', overflowX: 'hidden' }}>
        {/* Pasek boczny */}
        <motion.div
          ref={sidebarRef}
          variants={Nav_animation}
          initial={false}
          animate={open ? "open" : "closed"}
          className="w-1/4 flex flex-col items-start justify-start absolute z-10"
        >
          <div className="sidebar-header">
      <h1>{t("profile.title")} {user.name}!</h1>
    </div>
    {/* Przyciski z większą i grubszą czcionką */}
    <div className="sidebar-buttons">
      <button onClick={() => changeView("Order")}>
        <AiOutlineShopping className="inline mr-2" />
        {t("profile.button")}
      </button>
      <button onClick={() => changeView("Return")}>
        <BsArrowReturnRight className="inline mr-2" />
        {t("profile.button2")}
      </button>
      <button onClick={() => changeView("ShowComment")}>
        <BsPencil className="inline mr-2" />
        {t("profile.button3")}
      </button>
      <button onClick={() => changeView("AccountSettings")}>
        <BsGear className="inline mr-2" />
        {t("profile.button4")}
      </button>
      <button style={{ color: '#ff0000' }} onClick={handleLogout}>
        <BsBoxArrowLeft className="przycisk inline mr-2" />
        {t("profile.button5")}
      </button>
    </div>
        </motion.div>

        {/* Przycisk do otwierania/zamykania paska bocznego */}
        <div className="m-3 md:hidden absolute left-3 z-20" style={{ top: '-17px' }} onClick={() => setOpen(!open)}>
          <BsList size={25} />
        </div>

        {/* Zawartość główna */}
        <div className={`${contentClass} p-4 absolute right-0`}>
          {currentView === "Order" && <Order />}
          {currentView === "Return" && <Return />}
          {currentView === "ShowComment" && <ShowComment />}
          {currentView === "AccountSettings" && <AccountSettings />}
        </div>
      </div>
    );
  }
};

export default Profile;
