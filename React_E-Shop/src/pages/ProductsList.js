import { React, useState } from "react";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import "./css/ProductsList.css";
import { useParams } from "react-router-dom";

const ProductsList = () => {
  const { brand, sale } = useParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("asc");

  const handleFilters = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFilters({ ...filters, [name]: value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="productsList">
      <Announcement />
      <Navbar />
      <h1 className="productsList_title">{brand} Products</h1>
      <div className="productsList_cont">
        <div className="productsList_filter">
          <span className="productsList_span">Filter Products</span>
          <select
            name="colors"
            id="color"
            className="productsList_select"
            onChange={handleFilters}
          >
            <option
              disabled
              defaultValue="color"
              selected
              className="productsList_option"
            >
              Color
            </option>
            <option value="black" className="productsList_option">
              Black
            </option>
            <option value="red" className="productsList_option">
              Red
            </option>
            <option value="blue" className="productsList_option">
              Blue
            </option>
            <option value="pink" className="productsList_option">
              Pink
            </option>
            <option value="brown" className="productsList_option">
              Brown
            </option>
            <option value="gray" className="productsList_option">
              Gray
            </option>
          </select>
          <select
            name="size"
            id="size"
            className="productsList_select"
            onChange={handleFilters}
          >
            <option
              disabled
              selected
              defaultValue="size"
              className="productsList_option"
            >
              Size
            </option>
            <option value="XS" className="productsList_option">
              XS
            </option>
            <option value="S" className="productsList_option">
              S
            </option>
            <option value="M" className="productsList_option">
              M
            </option>
            <option value="L" className="productsList_option">
              L
            </option>
            <option value="XL" className="productsList_option">
              XL
            </option>
          </select>
        </div>
        <div className="productsList_filter">
          <span className="productsList_span">Sort Products</span>
          <select
            name="sort"
            id="sort"
            className="productsList_select"
            onChange={handleSort}
          >
            <option value="asc" className="productsList_option">
              Price (asc)
            </option>
            <option value="desc" className="productsList_option">
              Price (desc)
            </option>
          </select>
        </div>
      </div>
      <Products
        title=""
        brand={brand}
        filters={filters}
        sort={sort}
        sale={sale}
      />
      <Footer />
    </div>
  );
};

export default ProductsList;
