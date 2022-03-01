import React, { useEffect, useState } from "react";
import "./css/Products.css";
// import { productsItems } from "../data";
import { SearchOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = ({ title, brand, filters, sort, sale }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (typeof brand === "undefined" && typeof sale === "undefined") {
      const getProducts = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/products");
          setProducts(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    } else if (typeof brand !== "undefined") {
      const getProducts = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/products");
          const prods = res.data.filter((products) => products.brand === brand);
          setProducts(prods);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    } else if (typeof sale !== "undefined") {
      const getProducts = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/products");
          const prods = res.data.filter((products) => products.sale === sale);

          setProducts(prods);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    }
  }, [brand, sale]);

  useEffect(() => {
    if (typeof sale !== "undefined") {
      filters["sale"] = sale;
    }
    if (typeof brand !== "undefined" || typeof sale !== "undefined") {
      setFilteredProducts(
        products.filter((p) =>
          Object.entries(filters).every(([key, value]) =>
            p[key].includes(value)
          )
        )
      );
    }
  }, [products, filters, sale, brand, sort]);

  useEffect(() => {
    if (sort === "asc") {
      setFilteredProducts((prev) => {
        return [...prev].sort((first, second) => first.price - second.price);
      });
    } else if (sort === "desc") {
      setFilteredProducts((prev) => {
        return [...prev].sort((first, second) => second.price - first.price);
      });
    }
  }, [sort]);

  return (
    <div id="ID_PRODUCT">
      <h1 className="products_h1">{title}</h1>
      <div className="products">
        {typeof brand === "undefined" && typeof sale === "undefined"
          ? products.map((product) => {
              if (product.clicks >= 10)
                return (
                  <div className="products_wrapper" key={product._id}>
                    <img
                      className="products_image"
                      src={product.img}
                      alt={product.id}
                    />
                    <div className="products_info">
                      {/* <div className="products_icon">
                        <ShoppingCartOutlined />
                      </div> */}
                      <Link
                        to={`/product/${product._id}`}
                        className="products_icon"
                      >
                        <SearchOutlined />
                      </Link>
                    </div>
                  </div>
                );
              return false;
            })
          : filteredProducts?.map((product) => {
              return (
                <div className="products_wrapper" key={product._id}>
                  <img
                    className="products_image"
                    src={product.img}
                    alt={product.id}
                  />
                  <div className="products_info">
                    <Link
                      to={`/product/${product._id}`}
                      className="products_icon"
                    >
                      <SearchOutlined />
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
export default Products;
