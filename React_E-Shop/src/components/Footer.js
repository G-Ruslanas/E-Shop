import React, { useEffect } from "react";
import "./css/Footer.css";
import logo from "../images/LOGO.jpg";
import {
  Email,
  Facebook,
  Instagram,
  Map,
  Phone,
  Twitter,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="footer" id="ID_FOOTER">
      <div className="footer_left">
        <div className="footer_logo">
          <img className="footer_img" src={logo} alt="logo" />
        </div>
        <p className="footer_desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
          doloremque iusto doloribus ad deserunt veritatis, ullam cumque quos
          obcaecati. Dicta ducimus qui asperiores adipisci cumque a aliquam
          similique voluptate voluptas.
        </p>
        <div className="footer_follows">
          <div className="footer_icons">
            <Facebook />
          </div>
          <div className="footer_icons">
            <Instagram />
          </div>
          <div className="footer_icons">
            <Twitter />
          </div>
        </div>
      </div>
      <div className="footer_center">
        <h1 className="footer_links_title">Useful Links</h1>
        <ul className="footer_list">
          <Link to="/" className="footer_item">
            <li>Home</li>
          </Link>
          <Link to="/cart" className="footer_item">
            <li>Cart</li>
          </Link>
          <Link to="#" className="footer_item">
            <li>Contact us</li>
          </Link>
        </ul>
      </div>
      <div className="footer_right">
        <h1 className="footer_contact_title">Contact</h1>
        <div className="footer_contacts">
          <Map style={{ marginRight: "10px" }} />
          Vilnius, gatve 123, 12547
        </div>
        <div className="footer_contacts">
          <Phone style={{ marginRight: "10px" }} />
          +37021421354
        </div>
        <div className="footer_contacts">
          <Email style={{ marginRight: "10px" }} />
          contact@gmail.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
