import React from "react";
import "./css/Navbar.css";
import logo from "../images/LOGO.jpg";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Link } from "react-scroll";
import { Link as LinkDom } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        <div className="navbar_logo">
          <img className="navbar_img" src={logo} alt="logo" />
        </div>

        <div className="navbar_links">
          {window.location.pathname !== "/" && (
            <LinkDom to="/" className="navbar_anchors">
              <span className="navbar_spans">HOME</span>
            </LinkDom>
          )}
          {window.location.pathname === "/" && (
            <div>
              <Link to="ID_HEADER" smooth={true} activeClass="active">
                <span className="navbar_spans">HOME</span>
              </Link>
              <Link to="ID_PRODUCT" smooth={true}>
                <span className="navbar_spans">PRODUCTS</span>
              </Link>
              <Link to="ID_BRANDS" smooth={true}>
                <span className="navbar_spans">BRANDS</span>
              </Link>
            </div>
          )}
          <Link to="ID_FOOTER" smooth={true}>
            <span className="navbar_spans">CONTACT</span>
          </Link>
        </div>
        <LinkDom to="/cart" className="navbar_icons">
          <ShoppingCartOutlinedIcon />
        </LinkDom>
      </div>
    </div>
  );
};

export default Navbar;
