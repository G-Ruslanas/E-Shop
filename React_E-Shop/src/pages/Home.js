import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import Products from "../components/Products.js";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Slider />
      <Brands />
      <Products title="POPULAR PRODUCTS" />
      <Footer />
    </>
  );
};

export default Home;
